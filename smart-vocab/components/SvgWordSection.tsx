"use client";

import { useState } from "react";
import { Button } from "@heroui/button";

const COLORS = ["#38bdf8", "#22c55e", "#facc15", "#f472b6", "#f87171", "#818cf8", "#f4f4f5"];

export default function SvgWordSection() {
  const words = [ "Apple", "Sky", "Dream", "River", "Smile", "Future", "Magic", "Ocean", "Light"];
  const [colorIdx, setColorIdx] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[0]);

  const handleChange = () => {
    setColorIdx(idx => (idx + 1) % COLORS.length);
    let newWord = currentWord;
    while (newWord === currentWord && words.length > 1) {
      newWord = words[Math.floor(Math.random() * words.length)];
    }
    setCurrentWord(newWord);
  };

  return (
    <div className="w-full flex flex-col items-center mt-12">
      <h2 className="text-xl font-bold mb-2">SVG Word</h2>
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
      <Button color="danger" onPress={handleChange}>
        Change Color & Word
      </Button>
    </div>
  );
} 