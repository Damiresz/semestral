import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { getVocabularyByLevel, Level } from "@/app/actions/vocabulary";
import VocabularyCards from "@/components/VocabularyCards";
import { redirect } from "next/navigation";
import { Link } from "@heroui/link";

export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const cards = await getVocabularyByLevel(level as Level);
  return (
    <div className="container mx-auto px-4 py-8 scrollbar-hide">
      <Card className="max-w-4xl mx-auto p-8 scrollbar-hide">
        <CardHeader className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Level {level}</h1>
          <Button
            color="primary"
            variant="flat"
            as={Link}
            href="/dashboard"
          >
            Back to Dashboard
          </Button>
        </CardHeader>
        <CardBody className="scrollbar-hide">
          <VocabularyCards cards={cards} />
        </CardBody>
      </Card>
    </div>
  );
} 