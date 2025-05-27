/**
 * Authentication configuration for NextAuth.js
 * Handles user authentication using credentials provider and JWT strategy
 */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * Extends the default NextAuth session type to include custom user fields
 */
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    }
  }
}

// Initialize Prisma client for database operations
const prisma = new PrismaClient();

/**
 * NextAuth configuration options
 * Includes:
 * - Credentials provider setup
 * - Session configuration
 * - Custom pages
 * - JWT and session callbacks
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      /**
       * Authorize function to validate user credentials
       * @param credentials - User provided email and password
       * @returns User object if authentication successful, null otherwise
       */
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user by email in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user) {
            return null;
          }

          // Verify password using bcrypt
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          // Return user object without password
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  // Session configuration using JWT strategy
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Custom pages for authentication flow
  pages: {
    signIn: "/login",
    error: "/login",
  },
  // Callbacks for JWT and session handling
  callbacks: {
    /**
     * JWT callback to add user data to the token
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    /**
     * Session callback to add user data to the session
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  },
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
};