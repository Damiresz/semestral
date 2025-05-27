'use client';

import { useState } from 'react';

interface FlashcardProps {
  word: string;
  translation: string;
  imageUrl?: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export default function Flashcard({ word, translation, imageUrl, onCorrect, onIncorrect }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      onCorrect();
    } else {
      onIncorrect();
    }
    setShowAnswer(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative h-64 cursor-pointer transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={word}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
          )}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{word}</h2>
          <p className="text-gray-600">Click to flip</p>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-lg shadow-lg p-6 rotate-y-180 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{translation}</h2>
          {!showAnswer && (
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(true);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Correct
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnswer(false);
                }}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
              >
                Incorrect
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 