"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] p-6 bg-danger-50 rounded-lg border border-danger-200">
        <h3 className="text-xl font-bold text-danger-600 mb-2">Application is offline</h3>
        <p className="text-danger-500 text-center">
          Please check your internet connection and try again
        </p>
      </div>
    );
  }

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