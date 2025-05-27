/**
 * Server-side registration action
 * Handles user registration with email and password
 * Features password hashing and duplicate email checking
 */

"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Register a new user with the provided form data
 * @param {FormData} formData - Form data containing name, email and password
 * @returns {Promise<{error?: string, success?: boolean, user?: any}>} Registration result
 */
export async function register(formData: FormData) {
  // Extract form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate required fields
  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    // Check for existing user with the same email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    // Hash password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, user };
  } catch (error) {
    return { error: "An error occurred during registration" };
  }
} 