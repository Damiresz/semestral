/**
 * SVG Word Section component that displays animated text with color changes
 * Features random word selection and color cycling
 */

"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

// Available colors for text animation
const COLORS = ["#38bdf8", "#22c55e", "#facc15", "#f472b6", "#f87171", "#818cf8", "#f4f4f5"];

/**
 * SvgWordSection component that renders an animated text display
 * Features:
 * - SVG text rendering
 * - Color cycling animation
 * - Random word selection
 * - Interactive color/word change button
 */
export default function SvgWordSection() {
  // Predefined list of words to display
  const words = [ "Apple", "Sky", "Dream", "River", "Smile", "Future", "Magic", "Ocean", "Light"];
  // State for current color index
  const [colorIdx, setColorIdx] = useState(0);
  // State for current word
  const [currentWord, setCurrentWord] = useState(words[0]);

  /**
   * Handles color and word changes
   * Cycles through colors and selects a random different word
   */
  const handleChange = () => {
    // Update color index with cycling
    setColorIdx(idx => (idx + 1) % COLORS.length);
    // Select a new random word different from current
    let newWord = currentWord;
    while (newWord === currentWord && words.length > 1) {
      newWord = words[Math.floor(Math.random() * words.length)];
    }
    setCurrentWord(newWord);
  };

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <h2 className="text-xl font-bold mb-2">SVG Word</h2>
      {/* SVG container for text display */}
      <svg width="320" height="80" viewBox="0 0 320 80" className="mb-4">
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="48"
          fontWeight="bold"
          fill={COLORS[colorIdx]}
          style={{ fontFamily: 'inherit' }}
        >
          {currentWord}
        </text>
      </svg>
      {/* Button to trigger color and word changes */}
      <Button color="danger" onPress={handleChange}>
        Change Color & Word
      </Button>
    </div>
  );
} 