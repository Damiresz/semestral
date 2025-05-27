/**
 * Navigation bar component for the application
 * Provides responsive navigation with authentication-aware UI elements
 */

"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

/**
 * Main navigation component that handles:
 * - Responsive navigation menu
 * - Authentication state display
 * - Navigation controls (back/forward)
 * - Sign out functionality with confirmation
 */
export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  /**
   * Handles sign out process with confirmation
   * Uses browser notifications if available, falls back to confirm dialog
   */
  const handleSignOut = async () => {
    if ('Notification' in window) {
      if (Notification.permission === "granted") {
        const notification = new Notification("Confirm sign out?", {
          body: "Click to confirm logout.",
          requireInteraction: true
        });
        notification.onclick = () => {
          signOut();
          notification.close();
        };
      } else if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          handleSignOut();
        }
      } else {
        if (typeof window !== "undefined" && (window as any).confirm("Are you sure you want to sign out?")) {
          signOut();
        }
      }
    } else {
      if (typeof window !== "undefined" && (window as any).confirm("Are you sure you want to sign out?")) {
        signOut();
      }
    }
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Brand section */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Smart Vocab</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop navigation menu */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        {session?.user ? (
          <>
            {/* Navigation links for authenticated users */}
            <div className="flex gap-4 mr-auto">
              <NavbarItem>
                <Link href="/dashboard" color="primary" className="font-semibold px-2 py-1 hover:underline">
                  Dashboard
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/dashboard/more" color="primary" className="font-semibold px-2 py-1 hover:underline">
                  More materials
                </Link>
              </NavbarItem>
              {/* Navigation controls */}
              <NavbarItem>
                <button
                  className="px-2 py-1 text-primary-600 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => router.back()}
                >
                  ← Back
                </button>
              </NavbarItem>
              <NavbarItem>
                <button
                  className="px-2 py-1 text-primary-600 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer"
                  onClick={() => router.forward()}
                >
                  Forward →
                </button>
              </NavbarItem>
            </div>
            {/* User info and sign out button */}
            <NavbarItem className="flex items-center gap-4">
              <span className="text-default-600">Welcome, {session.user.name}</span>
              <Button
                as={Link}
                color="danger"
                variant="flat"
                onPress={handleSignOut}
              >
                Sign Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="flex gap-4">
            <Button
              as={Link}
              color="primary"
              variant="flat"
              href="/login"
            >
              Sign In
            </Button>
            <Button
              as={Link}
              color="primary"
              href="/register"
            >
              Sign Up
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile navigation menu */}
      <NavbarMenu>
        {session?.user ? (
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {/* Mobile navigation items for authenticated users */}
            <NavbarMenuItem>
              <Link href="/dashboard" color="primary" className="font-semibold px-2 py-1 hover:underline">
                Dashboard
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/dashboard/more" color="primary" className="font-semibold px-2 py-1 hover:underline">
                More materials
              </Link>
            </NavbarMenuItem>
            {/* Mobile navigation controls */}
            <NavbarMenuItem>
              <button
                className="px-2 py-1 text-primary-600 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer"
                onClick={() => router.back()}
              >
                ← Back
              </button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button
                className="px-2 py-1 text-primary-600 font-semibold hover:underline bg-transparent border-none outline-none cursor-pointer"
                onClick={() => router.forward()}
              >
                Forward →
              </button>
            </NavbarMenuItem>
            {/* Mobile user info and sign out */}
            <NavbarMenuItem>
              <span className="text-default-600">Welcome, {session.user.name}</span>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                color="danger"
                onClick={handleSignOut}
                size="lg"
              >
                Sign Out
              </Link>
            </NavbarMenuItem>
          </div>
        ) : (
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <NavbarMenuItem>
              <Link
                color="primary"
                href="/login"
                size="lg"
              >
                Sign In
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                color="primary"
                href="/register"
                size="lg"
              >
                Sign Up
              </Link>
            </NavbarMenuItem>
          </div>
        )}
      </NavbarMenu>
    </HeroUINavbar>
  );
}