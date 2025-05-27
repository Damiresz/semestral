import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { getLevels } from "../actions/vocabulary";
import LevelCards from "@/components/LevelCards";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const levels = await getLevels();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl p-4 mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="p-4 bg-default-100 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Welcome, {session.user?.name}!</h2>
              <p className="text-default-600">Choose your English level to start learning vocabulary.</p>
            </div>
            <LevelCards levels={levels} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 