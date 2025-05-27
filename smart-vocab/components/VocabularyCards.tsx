"use client";

import { useEffect, useState } from "react";
import { VocabularyCard } from "@/app/actions/vocabulary";

interface VocabularyCardsProps {
  cards: VocabularyCard[];
}

export default function VocabularyCards({ cards }: VocabularyCardsProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  // Загружаем просмотренные карточки из sessionStorage при монтировании
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("viewedVocabulary");
      if (stored) {
        setViewed(new Set(JSON.parse(stored)));
      }
    }
  }, []);

  // Обновляем sessionStorage при изменении viewed
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("viewedVocabulary", JSON.stringify(Array.from(viewed)));
    }
  }, [viewed]);

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
              <div className="flip-card-front relative">
                <div className="text-center">
                  <p className="text-2xl font-bold tracking-wide">{card.english}</p>
                  <p className="text-sm mt-2 text-sky-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to see translation
                  </p>
                </div>
                {isViewed && (
                  <span className="absolute top-2 right-3 text-sky-400 text-xl" title="Already viewed">
                    👁️
                  </span>
                )}
              </div>
              <div className="flip-card-back relative">
                <div className="text-center">
                  <p className="text-2xl font-bold tracking-wide">{card.czech}</p>
                  <p className="text-sm mt-2 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to see original
                  </p>
                </div>
                {isViewed && (
                  <span className="absolute top-2 right-3 text-sky-400 text-xl" title="Already viewed">
                    👁️
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