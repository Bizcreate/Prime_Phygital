import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  avatarUrl?: string
  emailVerified: boolean
  createdAt: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: User): string {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  )
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!)
  } catch (error) {
    return null
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }

    const users = await sql`
      SELECT id, email, first_name, last_name, role, avatar_url, email_verified, created_at
      FROM users
      WHERE id = ${decoded.userId}
    `

    if (users.length === 0) {
      return null
    }

    const user = users[0]
    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      avatarUrl: user.avatar_url,
      emailVerified: user.email_verified,
      createdAt: user.created_at,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function createUser(email: string, password: string, firstName: string, lastName: string): Promise<User> {
  const hashedPassword = await hashPassword(password)

  const users = await sql`
    INSERT INTO users (email, password_hash, first_name, last_name)
    VALUES (${email}, ${hashedPassword}, ${firstName}, ${lastName})
    RETURNING id, email, first_name, last_name, role, avatar_url, email_verified, created_at
  `

  const user = users[0]

  // Initialize user rewards
  await sql`
    INSERT INTO user_rewards (user_id, total_points, lifetime_points)
    VALUES (${user.id}, 0, 0)
  `

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    avatarUrl: user.avatar_url,
    emailVerified: user.email_verified,
    createdAt: user.created_at,
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const users = await sql`
    SELECT id, email, password_hash, first_name, last_name, role, avatar_url, email_verified, created_at
    FROM users
    WHERE email = ${email}
  `

  if (users.length === 0) {
    return null
  }

  const user = users[0]
  const isValidPassword = await verifyPassword(password, user.password_hash)

  if (!isValidPassword) {
    return null
  }

  // Update last login
  await sql`
    UPDATE users
    SET last_login = NOW()
    WHERE id = ${user.id}
  `

  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    role: user.role,
    avatarUrl: user.avatar_url,
    emailVerified: user.email_verified,
    createdAt: user.created_at,
  }
}
