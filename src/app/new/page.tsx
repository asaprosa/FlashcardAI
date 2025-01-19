'use client';

import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'hn', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

const difficultyLevels = [
  { title: 'A1 (Beginner)' },
  { title: 'A2 (Elementary)' },
  { title: 'B1 (Intermediate)' },
  { title: 'B2 (Upper Intermediate)' },
  { title: 'C1 (Advanced)' },
  { title: 'C2 (Proficiency)' },
];

interface GeneratedCard {
  front: string; // English word or phrase
  back: string;
}

export default function NewCardPage() {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<GeneratedCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const languagesRef = useRef<HTMLDivElement>(null);
  const levelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languagesRef.current && !languagesRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
      if (levelsRef.current && !levelsRef.current.contains(event.target as Node)) {
        setShowLevels(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateCards = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          level: selectedLevel,
          additionalInfo,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data: { cards: GeneratedCard[] } = await response.json();

      // Ensure that data.cards matches the desired structure (front, back)
      const formattedCards = data.cards.map((card) => ({
        front: card.front, // This is the phrase with pronunciation
        back: card.back,
      }));

      // Update the state with the formatted card data
      setGeneratedCards(formattedCards);

      // Optionally log the formatted front and back values for debugging
      formattedCards.forEach((card) => {
        console.log(`Front: ${card.front}, Back: ${card.back}`);
      });
    } catch (error) {
      console.error('Error generating cards:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleCardFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div
      className="min-h-screen p-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="w-full max-w-2xl mx-auto p-8 rounded-2xl border border-transparent  mb-12 mt-16 pt-16">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            Create New Cards
          </h1>

          {/* Language and Level Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Language Selection */}
            <div className="relative" ref={languagesRef}>
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="w-full p-4 bg-[#1A1A1A] text-left text-white rounded-xl border border-purple-500/30 focus:outline-none"
              >
                {selectedLanguage || 'Select Language'}
              </button>
              {showLanguages && (
                <div className="absolute z-10 w-full mt-2 bg-[#1A1A1A] border border-purple-500/30 rounded-xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setShowLanguages(false);
                      }}
                      className="w-full p-3 text-white text-left hover:bg-purple-500/20"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Level Selection */}
            <div className="relative" ref={levelsRef}>
              <button
                onClick={() => setShowLevels(!showLevels)}
                className="w-full p-4 bg-[#1A1A1A] text-left text-white rounded-xl border border-purple-500/30 focus:outline-none"
              >
                {selectedLevel || 'Select Level'}
              </button>
              {showLevels && (
                <div className="absolute z-10 w-full mt-2 bg-[#1A1A1A] border border-purple-500/30 rounded-xl">
                  {difficultyLevels.map((level) => (
                    <button
                      key={level.title}
                      onClick={() => {
                        setSelectedLevel(level.title);
                        setShowLevels(false);
                      }}
                      className="w-full p-3 text-white text-left hover:bg-purple-500/20"
                    >
                      {level.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Enter any additional info about your level or desired cards"
            className="w-full min-h-[120px] p-4 bg-[#1A1A1A] text-white rounded-xl border border-purple-500/30 focus:outline-none resize-none mb-6"
          />

          <button
            onClick={generateCards}
            disabled={isGenerating || !selectedLanguage || !selectedLevel}
            className="w-full py-4 flex justify-center items-center bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold disabled:bg-purple-600/50"
          >
            {isGenerating ? (
              <>
                <span className="loader" />
                Generating...
              </>
            ) : 'Generate'}
          </button>
        </div>

        {generatedCards.length > 0 && <h2 className="text-center text-white mt-10">Generated Cards</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center align-middle mt-20 pt-20 ml-20 text-white">
          {generatedCards.length > 0 ? (
            generatedCards.map((card, index) => (
              <div
                key={index}
                className={`relative card-container ${flippedCards[index] ? 'is-flipped' : ''}`}
                onClick={() => toggleCardFlip(index)}
              >
                <div className="card-front text-center items-center">
                  <h3>{card.front}</h3>
                </div>
                <div className="card-back text-center items-center">
                  <p>{card.back}</p>
                 
                </div>
              </div>
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
}
