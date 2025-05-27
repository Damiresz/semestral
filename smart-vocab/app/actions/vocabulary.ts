/**
 * Server-side vocabulary actions
 * Provides vocabulary data and level management
 * Features predefined vocabulary cards and stories for different language levels
 */

"use server";

/**
 * Language proficiency levels from A1 (beginner) to C2 (mastery)
 */
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

/**
 * Interface for vocabulary card data
 * @property {string} id - Unique identifier for the card
 * @property {string} english - English word or phrase
 * @property {string} czech - Czech translation
 * @property {Level} level - Language proficiency level
 */
export interface VocabularyCard {
  id: string;
  english: string;
  czech: string;
  level: Level;
}

/**
 * Interface for story data
 * @property {string} id - Unique identifier for the story
 * @property {string} title - Story title
 * @property {string} text - Story content
 * @property {string} audioUrl - URL to audio recording
 */
export interface Story {
  id: string;
  title: string;
  text: string;
  audioUrl: string;
}

/**
 * Get available language learning levels
 * @returns {Promise<Array<{id: Level, name: string, description: string}>>} Array of level data
 */
export async function getLevels() {
  return [
    { id: "A1", name: "Beginner", description: "Basic vocabulary and phrases" },
    { id: "A2", name: "Elementary", description: "Simple everyday expressions" },
    { id: "B1", name: "Intermediate", description: "Common topics and situations" },
    { id: "B2", name: "Upper Intermediate", description: "Complex ideas and technical topics" },
    { id: "C1", name: "Advanced", description: "Advanced vocabulary and expressions" },
    { id: "C2", name: "Mastery", description: "Native-like proficiency" },
  ];
}

/**
 * Get vocabulary cards for a specific language level
 * @param {Level} level - Language proficiency level
 * @returns {Promise<VocabularyCard[]>} Array of vocabulary cards for the specified level
 */
export async function getVocabularyByLevel(level: Level) {
  // Predefined vocabulary data for each level
  const data: Record<Level, VocabularyCard[]> = {
    // A1 level - Basic vocabulary
    A1: [
      { id: "a1-1", english: "Hello", czech: "Ahoj", level },
      { id: "a1-2", english: "Goodbye", czech: "Sbohem", level },
      { id: "a1-3", english: "Please", czech: "Prosím", level },
      { id: "a1-4", english: "Thank you", czech: "Děkuji", level },
      { id: "a1-5", english: "Yes", czech: "Ano", level },
      { id: "a1-6", english: "No", czech: "Ne", level },
      { id: "a1-7", english: "Name", czech: "Jméno", level },
      { id: "a1-8", english: "Family", czech: "Rodina", level },
      { id: "a1-9", english: "Friend", czech: "Přítel", level },
    ],
    // A2 level - Elementary vocabulary
    A2: [
      { id: "a2-1", english: "Breakfast", czech: "Snídaně", level },
      { id: "a2-2", english: "Lunch", czech: "Oběd", level },
      { id: "a2-3", english: "Dinner", czech: "Večeře", level },
      { id: "a2-4", english: "Market", czech: "Trh", level },
      { id: "a2-5", english: "Shop", czech: "Obchod", level },
      { id: "a2-6", english: "Money", czech: "Peníze", level },
      { id: "a2-7", english: "Ticket", czech: "Lístek", level },
      { id: "a2-8", english: "Bus", czech: "Autobus", level },
      { id: "a2-9", english: "Train", czech: "Vlak", level },
    ],
    // B1 level - Intermediate vocabulary
    B1: [
      { id: "b1-1", english: "Journey", czech: "Cesta", level },
      { id: "b1-2", english: "Experience", czech: "Zkušenost", level },
      { id: "b1-3", english: "Advice", czech: "Rada", level },
      { id: "b1-4", english: "Opinion", czech: "Názor", level },
      { id: "b1-5", english: "Choice", czech: "Volba", level },
      { id: "b1-6", english: "Chance", czech: "Šance", level },
      { id: "b1-7", english: "Success", czech: "Úspěch", level },
      { id: "b1-8", english: "Failure", czech: "Neúspěch", level },
      { id: "b1-9", english: "Goal", czech: "Cíl", level },
    ],
    // B2 level - Upper intermediate vocabulary
    B2: [
      { id: "b2-1", english: "Environment", czech: "Prostředí", level },
      { id: "b2-2", english: "Development", czech: "Rozvoj", level },
      { id: "b2-3", english: "Research", czech: "Výzkum", level },
      { id: "b2-4", english: "Solution", czech: "Řešení", level },
      { id: "b2-5", english: "Resource", czech: "Zdroj", level },
      { id: "b2-6", english: "Network", czech: "Síť", level },
      { id: "b2-7", english: "Industry", czech: "Průmysl", level },
      { id: "b2-8", english: "Economy", czech: "Ekonomika", level },
      { id: "b2-9", english: "Policy", czech: "Politika", level },
    ],
    // C1 level - Advanced vocabulary
    C1: [
      { id: "c1-1", english: "Comprehensive", czech: "Komplexní", level },
      { id: "c1-2", english: "Substantial", czech: "Podstatný", level },
      { id: "c1-3", english: "Ambiguous", czech: "Nejednoznačný", level },
      { id: "c1-4", english: "Notion", czech: "Pojem", level },
      { id: "c1-5", english: "Perception", czech: "Vnímání", level },
      { id: "c1-6", english: "Phenomenon", czech: "Jev", level },
      { id: "c1-7", english: "Framework", czech: "Rámec", level },
      { id: "c1-8", english: "Paradigm", czech: "Paradigma", level },
      { id: "c1-9", english: "Discrepancy", czech: "Nesoulad", level },
    ],
    // C2 level - Mastery vocabulary
    C2: [
      { id: "c2-1", english: "Ephemeral", czech: "Pomíjivý", level },
      { id: "c2-2", english: "Quintessential", czech: "Typický", level },
      { id: "c2-3", english: "Obfuscate", czech: "Zatemnit", level },
      { id: "c2-4", english: "Serendipity", czech: "Šťastná náhoda", level },
      { id: "c2-5", english: "Ubiquitous", czech: "Všudypřítomný", level },
      { id: "c2-6", english: "Juxtaposition", czech: "Srovnání", level },
      { id: "c2-7", english: "Vicissitude", czech: "Zvrat", level },
      { id: "c2-8", english: "Ineffable", czech: "Nevyjádřitelný", level },
      { id: "c2-9", english: "Ebullient", czech: "Nadšený", level },
    ],
  };
  return data[level];
} 