'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VocabularyWord {
  word: string;
  translation: string;
  imageUrl?: string;
}

export default function NewVocabularyPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [words, setWords] = useState<VocabularyWord[]>([{ word: '', translation: '', imageUrl: '' }]);

  const addNewWord = () => {
    setWords([...words, { word: '', translation: '', imageUrl: '' }]);
  };

  const updateWord = (index: number, field: keyof VocabularyWord, value: string) => {
    const newWords = [...words];
    newWords[index] = { ...newWords[index], [field]: value };
    setWords(newWords);
  };

  const removeWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log({ title, words });
    // For now, just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Vocabulary List</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  List Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-4">
                {words.map((word, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Word {index + 1}</h3>
                      {words.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWord(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Word
                        </label>
                        <input
                          type="text"
                          value={word.word}
                          onChange={(e) => updateWord(index, 'word', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Translation
                        </label>
                        <input
                          type="text"
                          value={word.translation}
                          onChange={(e) => updateWord(index, 'translation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL (optional)
                      </label>
                      <input
                        type="url"
                        value={word.imageUrl}
                        onChange={(e) => updateWord(index, 'imageUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-x-4">
                <button
                  type="button"
                  onClick={addNewWord}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Add Word
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create List
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 