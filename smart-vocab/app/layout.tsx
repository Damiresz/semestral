/**
 * Root layout component for the application
 * Defines the basic HTML structure and includes global providers and navigation
 */

import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Navbar from "../components/navbar";

// Initialize Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

/**
 * Application metadata configuration
 * Defines title, description and favicon for the application
 */
export const metadata: Metadata = {
  title: "Smart Vocab",
  description: "Улучшайте свой словарный запас с помощью умных карточек",
  icons: {
    icon: "/favicon.ico",
  },
};

/**
 * Root layout component that wraps all pages
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered
 * @returns {JSX.Element} The root layout structure
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body className={inter.className}>
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
