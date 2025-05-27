/**
 * Level page component
 * Displays vocabulary cards for a specific language level
 * Features authentication check and navigation controls
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { getVocabularyByLevel, Level } from "@/app/actions/vocabulary";
import VocabularyCards from "@/components/VocabularyCards";
import { redirect } from "next/navigation";
import { Link } from "@heroui/link";

/**
 * LevelPage component that renders vocabulary cards for a specific level
 * Features:
 * - Authentication check with redirect to login if not authenticated
 * - Dynamic level-based vocabulary display
 * - Navigation back to dashboard
 * - Scrollable card layout
 * @param {Object} params - Route parameters containing the level
 * @param {Promise<{level: string}>} params.params - Promise resolving to level parameter
 */
export default async function LevelPage({ params }: { params: Promise<{ level: string }> }) {
  // Extract level from route parameters
  const { level } = await params;
  
  // Check user authentication status
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  // Fetch vocabulary cards for the specified level
  const cards = await getVocabularyByLevel(level as Level);
  
  return (
    <div className="container mx-auto px-4 py-8 scrollbar-hide">
      <Card className="max-w-4xl mx-auto p-8 scrollbar-hide">
        <CardHeader className="flex justify-between items-center">
          {/* Level title */}
          <h1 className="text-2xl font-bold">Level {level}</h1>
          {/* Back to dashboard button */}
          <Button
            color="primary"
            variant="flat"
            as={Link}
            href="/dashboard"
          >
            Back to Dashboard
          </Button>
        </CardHeader>
        {/* Vocabulary cards container */}
        <CardBody className="scrollbar-hide">
          <VocabularyCards cards={cards} />
        </CardBody>
      </Card>
    </div>
  );
} 