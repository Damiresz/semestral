/**
 * Vocabulary cards component that displays interactive flashcards
 * Features flip animation and tracks viewed cards in session storage
 */

"use client";

import { useEffect, useState } from "react";
import { VocabularyCard } from "@/app/actions/vocabulary";

/**
 * Props interface for the VocabularyCards component
 * @property {VocabularyCard[]} cards - Array of vocabulary cards to display
 */
interface VocabularyCardsProps {
  cards: VocabularyCard[];
}

/**
 * VocabularyCards component that renders a grid of interactive flashcards
 * Features:
 * - Card flipping animation
 * - Progress tracking for viewed cards
 * - Responsive grid layout
 * - Hover effects and visual indicators
 */
export default function VocabularyCards({ cards }: VocabularyCardsProps) {
  // State for currently flipped cards
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  // State for cards that have been viewed
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  // Load viewed cards from session storage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("viewedVocabulary");
      if (stored) {
        setViewed(new Set(JSON.parse(stored)));
      }
    }
  }, []);

  // Save viewed cards to session storage when updated
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("viewedVocabulary", JSON.stringify(Array.from(viewed)));
    }
  }, [viewed]);

  /**
   * Toggles the flip state of a card and marks it as viewed
   * @param {string} cardId - ID of the card to toggle
   */
  const toggleCard = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
        setViewed(v => new Set(v).add(cardId));
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const isViewed = viewed.has(card.id);
        return (
          <div
            key={card.id}
            className={`flip-card group ${flippedCards.has(card.id) ? 'flipped' : ''}`}
            onClick={() => toggleCard(card.id)}
          >
            <div className="flip-card-inner">
              {/* Front side of the card */}
              <div className="flip-card-front relative">
                <div className="text-center">
                  <p className="text-2xl font-bold tracking-wide">{card.english}</p>
                  <p className="text-sm mt-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to see translation
                  </p>
                </div>
                {/* Viewed indicator */}
                {isViewed && (
                  <span className="absolute top-2 right-3 text-sky-400 text-xl" title="Already viewed">
                    👁️
                  </span>
                )}
              </div>
              {/* Back side of the card */}
              <div className="flip-card-back relative">
                <div className="text-center">
                  <p className="text-2xl font-bold tracking-wide">{card.czech}</p>
                  <p className="text-sm mt-2 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to see original
                  </p>
                </div>
                {/* Viewed indicator */}
                {isViewed && (
                  <span className="absolute top-2 right-3 text-sky-400 text-xl" title="Already viewed">
                    ��️
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 