/**
 * Registration page component
 * Provides user registration form with name, email and password
 * Features form validation and error handling
 */

"use client";

import { register } from "@/app/actions/register";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

/**
 * RegisterPage component that renders the registration form
 * Features:
 * - Name, email and password input fields
 * - Form validation
 * - Error message display
 * - Navigation to login page on successful registration
 * - Link to login page for existing users
 */
export default function RegisterPage() {
  const router = useRouter();
  // State for storing registration error message
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission for user registration
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Attempt user registration
    const result = await register(formData);
    
    // Handle registration result
    if (result.error) {
      setError(result.error);
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Error message display */}
            {error && (
              <div className="bg-danger-100 border border-danger-400 text-danger-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {/* Name input field */}
            <Input
              label="Name"
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              autoComplete="name"
            />
            {/* Email input field */}
            <Input
              label="Email"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
            {/* Password input field */}
            <Input
              label="Password"
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              autoComplete="new-password"
            />
            {/* Submit button */}
            <Button
              type="submit"
              color="primary"
              className="w-full"
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
        {/* Login link */}
        <CardFooter className="flex justify-center">
          <p className="text-default-600">
            Already have an account?{" "}
            <Link href="/login" color="primary">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 