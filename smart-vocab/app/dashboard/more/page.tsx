/**
 * Dashboard extra page component
 * Displays additional learning materials and interactive features
 * Features authentication check and dynamic content loading
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { getVocabularyByLevel } from "../../actions/vocabulary";
import StoriesSection from "@/components/StoriesSection";
import FlyingWordsCanvas from "@/components/FlyingWordsCanvas";
import SvgWordSection from "@/components/SvgWordSection";
import { redirect } from "next/navigation";

/**
 * DashboardExtraPage component that renders additional learning materials
 * Features:
 * - Authentication check with redirect to login if not authenticated
 * - Audio stories section
 * - Interactive flying words canvas
 * - Animated SVG word display
 * - Random vocabulary selection from all levels
 */
export default async function DashboardExtraPage() {
  // Check user authentication status
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Fetch stories from API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/stories`);
  const stories = await res.json();

  // Get random vocabulary from all levels
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
            {/* Audio stories section */}
            <StoriesSection stories={stories} />
            {/* Interactive flying words canvas */}
            <FlyingWordsCanvas words={allWords} />
            {/* Animated SVG word display */}
            <SvgWordSection />
          </div>
        </CardBody>
      </Card>
    </div>
  );
} 