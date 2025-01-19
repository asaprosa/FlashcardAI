'use client';

import { useAuth } from '@/context/AutoContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnimatedCards from '@/components/AnimatedCards'; // Corrected import statement
import LearnSection from '@/components/LearnSection';
import SpacedRepetitionSection from '@/components/SpacedRepetitionSection'
import CoreVocabularySection from '@/components/CoreVocabularySection';
import DifficultyLevelsSection from '@/components/DifficultyLevelsSection';
import InfiniteScrollRight from '@/components/InfiniteScrollRight';


export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router, mounted]);

  const handleGetStarted = () => {
    router.push('/new');
  };

  if (loading || !mounted) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-160px)]">
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 mt-16">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Section */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Learn new languages in a flash
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Master languages faster with AI-generated flashcards tailored for your learning needs for free!
            </p>
            <div className="flex items-center gap-4 mb-8">
              <h2 className=" font-bold">+20 languages</h2>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-500"></div>
              <button 
                onClick={() => user ? handleGetStarted() : router.push('/login')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform "
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 flex justify-center items-center">
            <AnimatedCards />
          </div>
        </div>
      </div>

      {/* Infinite Scroll Section */}
      <div className="mt-16 pt-16">
      <InfiniteScrollRight />
      </div>
      <LearnSection />
      <SpacedRepetitionSection />
      <CoreVocabularySection/>

      <div className="mt-16">
        <DifficultyLevelsSection/>
      </div>
      
     
      <div className="flex justify-center px-5 py-20">
      <div className="flex flex-col items-center gap-8 lg:gap-12 w-full max-w-[1440px] p-5 py-20 lg:p-20 bg-gradient-to-r from-purple-500 to-blue-500 via-white bg-noisy-card rounded-2xl lg:rounded-3xl">
      <h2 className="font-dela-gothic-one text-4xl lg:text-5xl !leading[110%] pb-2 text-black max-w-[700px] text-center font-extrabold">
        Ready to ace a new language?
      </h2>
      <a href="/new" className="font-manrope font-bold -tracking-[.02em] text-lg lg:text-xl !leading-none text-black bg-white rounded-xl lg:rounded-2xl py-4 px-6 lg:py-[18px] lg:px-9 hover:bg-none hover:bg-black hover:text-white transition-colors duration-100">
        Let&apos;s go 🚀
      </a>
    </div>
      </div>
    </div>
  );
}
