"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="bg-danger-100 border border-danger-400 text-danger-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <Input
              label="Email"
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
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