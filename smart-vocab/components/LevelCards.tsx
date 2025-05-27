"use client";

import { useRouter } from "next/navigation";

interface Level {
  id: string;
  name: string;
  description: string;
}

interface LevelCardsProps {
  levels: Level[];
}

export default function LevelCards({ levels }: LevelCardsProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {levels.map((level) => (
        <div
          key={level.id}
          className="level-card cursor-pointer select-none"
          onClick={() => router.push(`/dashboard/level/${level.id}`)}
        >
          <div className="p-6 flex flex-col h-full justify-between">
            <h3 className="text-xl font-bold mb-2">{level.name}</h3>
            <p className="text-default-600 mb-4">{level.description}</p>
            <div className="mt-auto text-sm font-medium text-sky-400">
              Level {level.id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 