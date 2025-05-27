'use client';

import { useState } from 'react';
import Flashcard from '@/app/components/Flashcard';

// Mock data - in real app this would come from an API
const mockVocabulary = [
  { id: 1, word: 'Hello', translation: 'Привет', imageUrl: '/images/hello.jpg' },
  { id: 2, word: 'Goodbye', translation: 'До свидания', imageUrl: '/images/goodbye.jpg' },
  { id: 3, word: 'Thank you', translation: 'Спасибо', imageUrl: '/images/thank-you.jpg' },
];

export default function PracticePage({ params }: { params: { id: string } }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  const handleCorrect = () => {
    setCorrectAnswers(prev => prev + 1);
    moveToNext();
  };

  const handleIncorrect = () => {
    setIncorrectAnswers(prev => prev + 1);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < mockVocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentWord = mockVocabulary[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-800">Practice Session</h1>
              <div className="text-sm text-gray-600">
                Word {currentIndex + 1} of {mockVocabulary.length}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div className="text-green-600">Correct: {correctAnswers}</div>
              <div className="text-red-600">Incorrect: {incorrectAnswers}</div>
            </div>
          </div>

          {currentIndex < mockVocabulary.length ? (
            <Flashcard
              word={currentWord.word}
              translation={currentWord.translation}
              imageUrl={currentWord.imageUrl}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Session Complete!</h2>
              <p className="text-gray-600 mb-4">
                You got {correctAnswers} out of {mockVocabulary.length} correct.
              </p>
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setCorrectAnswers(0);
                  setIncorrectAnswers(0);
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Practice Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 