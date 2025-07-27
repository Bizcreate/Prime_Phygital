import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserData {
  email: string
  password: string
  name: string
  role?: "admin" | "user"
}

export interface AuthenticateUserData {
  email: string
  password: string
}

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function createUser(userData: CreateUserData): Promise<User> {
  const { email, password, name, role = "user" } = userData

  // Check if user already exists
  const existingUser = await sql`
    SELECT id FROM users WHERE email = ${email}
  `

  if (existingUser.length > 0) {
    throw new Error("User already exists")
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create user
  const result = await sql`
    INSERT INTO users (email, password, name, role, created_at, updated_at)
    VALUES (${email}, ${hashedPassword}, ${name}, ${role}, NOW(), NOW())
    RETURNING id, email, name, role, created_at, updated_at
  `

  const user = result[0]
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    createdAt: new Date(user.created_at),
    updatedAt: new Date(user.updated_at),
  }
}

export async function authenticateUser(credentials: AuthenticateUserData): Promise<{ user: User; token: string }> {
  const { email, password } = credentials

  // Find user
  const result = await sql`
    SELECT id, email, password, name, role, created_at, updated_at
    FROM users 
    WHERE email = ${email}
  `

  if (result.length === 0) {
    throw new Error("Invalid credentials")
  }

  const userData = result[0]

  // Verify password
  const isValidPassword = await bcrypt.compare(password, userData.password)

  if (!isValidPassword) {
    throw new Error("Invalid credentials")
  }

  // Create user object
  const user: User = {
    id: userData.id,
    email: userData.email,
    name: userData.name,
    role: userData.role,
    createdAt: new Date(userData.created_at),
    updatedAt: new Date(userData.updated_at),
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" })

  return { user, token }
}

export async function getCurrentUser(token: string): Promise<User | null> {
  try {
    // Verify and decode token
    const decoded = jwt.verify(token, JWT_SECRET) as any

    // Get user from database
    const result = await sql`
      SELECT id, email, name, role, created_at, updated_at
      FROM users 
      WHERE id = ${decoded.userId}
    `

    if (result.length === 0) {
      return null
    }

    const userData = result[0]
    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      createdAt: new Date(userData.created_at),
      updatedAt: new Date(userData.updated_at),
    }
  } catch (error) {
    return null
  }
}

export function generateToken(user: User): string {
  return jwt.sign({ userId: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new Error("Invalid token")
  }
}
