'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const greetings = [
  { text: "Hello" },
  { text: "Hola" },
  { text: "Bonjour" },
  { text: "Ciao" },
  { text: "こんにちは" },
  { text: "안녕하세요" },
  { text: "你好" },
  { text: "नमस्ते" }, // Hindi
  { text: "سلام" }, // Urdu
  { text: "مرحبا" }, // Arabic
  { text: "שלום" }, // Hebrew
  { text: "Γεια σας" }, // Greek
  { text: "Cześć" }, // Polish
];

const AnimatedCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % greetings.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);
 

  return (
    <div className="grid place-content-start md:place-content-center w-full md:w-1/2 relative">
      <div className="grid grid-cols-1 grid-rows-1 auto-rows-auto relative">
        {/* Background Cards */}
        <motion.div 
          className="col-start-1 col-end-2 row-start-1 row-end-1 -rotate-[1.8deg] opacity-30 bg-gradient-to-b from-purple-600/50 to-blue-600/50 w-[300px] lg:w-[425px] h-[240px] rounded-3xl"
          animate={{ rotate: [-1.8, 1.8, -1.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="col-start-1 col-end-2 row-start-1 row-end-1 rotate-[4.5deg] opacity-30 bg-gradient-to-b from-purple-600/50 to-blue-600/50 w-[300px] lg:w-[425px] h-[240px] rounded-3xl"
          animate={{ rotate: [4.5, -4.5, 4.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative grid place-content-center col-start-1 col-end-2 row-start-1 row-end-1 rotate-[1.5deg] bg-gradient-to-br from-purple-600/20 to-purple-900/40 backdrop-blur-sm border border-purple-500/30 w-[300px] lg:w-[425px] h-[240px] rounded-3xl"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-2">
                {greetings[currentIndex].text}
              </h2>
             
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
    </div>
  );
};

export default AnimatedCards;
