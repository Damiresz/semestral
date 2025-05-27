import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { getVocabularyByLevel } from "../../actions/vocabulary";
import StoriesSection from "@/components/StoriesSection";
import FlyingWordsCanvas from "@/components/FlyingWordsCanvas";
import SvgWordSection from "@/components/SvgWordSection";
import { redirect } from "next/navigation";

export default async function DashboardExtraPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/stories`);
  
  const stories = await res.json();
  const allLevels = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
  const randomLevel = allLevels[Math.floor(Math.random() * allLevels.length)];
  const vocab = await getVocabularyByLevel(randomLevel);
  const allWords = vocab.map(w => w.english);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl p-4 mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold">More materials</h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-8">
            <StoriesSection stories={stories} />
            <FlyingWordsCanvas words={allWords} />
            <SvgWordSection />
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 