import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Card, CardBody } from "@heroui/card";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/config/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="bg-background flex items-center justify-center">
      <div className="max-w-7xl mt-36 w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
            <span className="block">Welcome to</span>
            <span className="block text-primary-600">Smart Vocab</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-default-700 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Enhance your vocabulary with smart flashcards and personalized learning.
          </p>
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
          {/* Моковая таблица */}
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
                  <tr className="hover:bg-primary-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Alice</td>
                    <td className="px-6 py-4 whitespace-nowrap">B2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-primary-500 h-2.5 rounded-full" style={{width: '80%'}}></div>
                      </div>
                      <span className="text-xs text-primary-700 ml-2">80%</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-primary-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Bob</td>
                    <td className="px-6 py-4 whitespace-nowrap">A2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{width: '45%'}}></div>
                      </div>
                      <span className="text-xs text-green-700 ml-2">45%</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-primary-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap font-semibold">Charlie</td>
                    <td className="px-6 py-4 whitespace-nowrap">C1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-sky-500 h-2.5 rounded-full" style={{width: '62%'}}></div>
                      </div>
                      <span className="text-xs text-sky-700 ml-2">62%</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
