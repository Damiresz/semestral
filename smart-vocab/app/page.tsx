/**
 * Home page component for the Smart Vocab application
 * Displays welcome message, authentication options, and user progress table
 */

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { redirect } from "next/navigation";
import { UserProgress, UserProgressManager } from "@/types/vocabulary";

/**
 * Home page component that handles:
 * - Authentication check and redirect
 * - Display of welcome message and call-to-action buttons
 * - User progress table with sample data
 * @returns {JSX.Element} The home page layout
 */
export default async function Home() {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);

  // Redirect to dashboard if user is logged in
  if (session) {
    redirect("/dashboard");
  }

  // Initialize progress manager with sample data
  const progressManager = new UserProgressManager();

  // Add sample users with their progress
  progressManager.addUser(new UserProgress("1", "Alice", "B2", 80));
  progressManager.addUser(new UserProgress("2", "Bob", "A2", 45));
  progressManager.addUser(new UserProgress("3", "Charlie", "C1", 62));

  const users = progressManager.getUsers();

  return (
    <main className="bg-background flex items-center justify-center">
      <div className="max-w-7xl mt-36 w-full px-4 sm:px-6 lg:px-8">
        {/* Welcome section with title and description */}
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-primary-600">Smart Vocab</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-default-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Enhance your vocabulary with smart flashcards and personalized learning.
          </p>
          
          {/* Authentication buttons card */}
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <Card className="w-full bg-content1 shadow-lg">
              <CardBody className="flex flex-col gap-4">
                <Button
                  as={Link}
                  color="primary"
                  size="lg"
                  href="/register"
                  className="w-full font-semibold"
                >
                  Get Started Free
                </Button>
                <Button
                  as={Link}
                  color="primary"
                  variant="flat"
                  size="lg"
                  href="/login"
                  className="w-full font-semibold"
                >
                  Sign In
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* User progress table section */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200 bg-content1">
                <thead className="bg-primary-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">Progress</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => {
                    const progressInfo = user.getProgressInfo();
                    const color = user.getProgressColor();
                    return (
                      <tr key={user.id} className="hover:bg-primary-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">{progressInfo.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{progressInfo.level}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* Progress bar with dynamic color and width */}
                          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div 
                              className={`bg-${color}-500 h-2.5 rounded-full`} 
                              style={{width: `${progressInfo.progress}%`}}
                            ></div>
                          </div>
                          <span className={`text-xs text-${color}-700 ml-2`}>{progressInfo.progress}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
