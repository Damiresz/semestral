/**
 * Login page component
 * Provides user authentication form with email and password
 * Features error handling and navigation to dashboard on success
 */

"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

/**
 * LoginPage component that renders the authentication form
 * Features:
 * - Email and password input fields
 * - Form validation
 * - Error message display
 * - Navigation to dashboard on successful login
 * - Link to registration page
 */
export default function LoginPage() {
  const router = useRouter();
  // State for storing authentication error message
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle form submission for user authentication
   * @param {React.FormEvent<HTMLFormElement>} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    
    // Get form data and attempt authentication
    const formData = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    // Handle authentication result
    if (result?.error) {
      setError("Invalid email or password");
    } else if (result?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Error message display */}
            {error && (
              <div className="bg-danger-100 border border-danger-400 text-danger-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
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
              autoComplete="current-password"
            />
            {/* Submit button */}
            <Button
              type="submit"
              color="primary"
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        {/* Registration link */}
        <CardFooter className="flex justify-center">
          <p className="text-default-600">
            Don't have an account?{" "}
            <Link href="/register" color="primary">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
} 