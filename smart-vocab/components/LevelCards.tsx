/**
 * Level cards component that displays available learning levels
 * Features online/offline state handling and responsive grid layout
 */

"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

/**
 * Interface for level data structure
 * @property {string} id - Unique identifier for the level
 * @property {string} name - Display name of the level
 * @property {string} description - Description of the level content
 */
interface Level {
  id: string;
  name: string;
  description: string;
}

/**
 * Props interface for the LevelCards component
 * @property {Level[]} levels - Array of level objects to display
 */
interface LevelCardsProps {
  levels: Level[];
}

/**
 * LevelCards component that renders a grid of interactive level cards
 * Features:
 * - Online/offline state detection
 * - Responsive grid layout
 * - Navigation to level-specific pages
 * - Offline state warning message
 */
export default function LevelCards({ levels }: LevelCardsProps) {
  const router = useRouter();
  // State for tracking online/offline status
  const [isOnline, setIsOnline] = useState(true);

  // Set up online/offline event listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Set initial online state
    setIsOnline(navigator.onLine);

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Display offline warning if not connected
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
            {/* Level title */}
            <h3 className="text-xl font-bold mb-2">{level.name}</h3>
            {/* Level description */}
            <p className="text-default-600 mb-4">{level.description}</p>
            {/* Level identifier */}
            <div className="mt-auto text-sm font-medium text-sky-400">
              Level {level.id}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 