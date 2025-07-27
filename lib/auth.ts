import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "customer"
  createdAt: string
}

export interface AuthToken {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  } catch (error) {
    console.error("Error hashing password:", error)
    throw new Error("Failed to hash password")
  }
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.error("Error verifying password:", error)
    return false
  }
}

// Generate JWT token
export function generateToken(user: User): string {
  try {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    }

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "7d",
    })
  } catch (error) {
    console.error("Error generating token:", error)
    throw new Error("Failed to generate token")
  }
}

// Verify JWT token
export function verifyToken(token: string): AuthToken | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthToken
    return decoded
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

// Extract token from Authorization header
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null
  }

  return authHeader.substring(7)
}

// Get user from token
export async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }

    // In a real app, you would fetch the user from the database
    // For now, we'll return a mock user based on the token
    return {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.email.split("@")[0],
      role: decoded.role as "admin" | "user" | "customer",
      createdAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Error getting user from token:", error)
    return null
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function isValidPassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Generate random user ID
export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

// Check if user has required role
export function hasRole(user: User, requiredRole: string | string[]): boolean {
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.role)
  }
  return user.role === requiredRole
}

// Sanitize user data for client
export function sanitizeUser(user: User): Omit<User, "password"> {
  const { ...sanitized } = user
  return sanitized
}
