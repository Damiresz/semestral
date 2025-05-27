/**
 * This file contains the main providers setup for the application.
 * It combines various providers including authentication, theming, and UI components.
 */

"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

/**
 * Props interface for the Providers component
 * @property {React.ReactNode} children - Child components to be wrapped by providers
 * @property {ThemeProviderProps} themeProps - Optional theme configuration properties
 */
export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

/**
 * Type declaration to extend React Router configuration
 * Adds custom router options type support
 */
declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

/**
 * Main Providers component that wraps the application with necessary providers
 * Includes:
 * - SessionProvider for authentication
 * - HeroUIProvider for UI components
 * - NextThemesProvider for theme management
 */
export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
