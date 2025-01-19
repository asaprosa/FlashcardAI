'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlashcardProps {
  front: string;
  back: {
    translation: string;
    pronunciation: string;
  };
}

const Flashcard = ({ front, back }: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full max-w-md aspect-[3/2] cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full relative [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div className={`absolute inset-0 backface-hidden ${!isFlipped ? 'z-10' : 'z-0'}`}>
          <div className="w-full h-full bg-[#1A1A1A] rounded-2xl border border-purple-500/30 p-8 flex flex-col items-center justify-center">
            <h3 className="text-2xl text-white font-bold text-center">{front}</h3>
          </div>
        </div>

        {/* Back */}
        <div 
          className={`absolute inset-0 backface-hidden [transform:rotateY(180deg)] ${isFlipped ? 'z-10' : 'z-0'}`}
        >
          <div className="w-full h-full bg-[#1A1A1A] rounded-2xl border border-purple-500/30 p-8 flex flex-col items-center justify-center gap-4">
            <h3 className="text-2xl text-white font-bold text-center">{back.translation}</h3>
            <p className="text-purple-400 text-lg italic text-center">{back.pronunciation}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flashcard;