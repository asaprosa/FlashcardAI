'use client';
const DifficultyLevelsSection = () => {
  const levels = [
    {
      title: 'A1 (Beginner)',
      description: 'Learners can understand and use basic phrases and expressions.',
      borderColor: 'border-pink',
      gradient: 'bg-pink-gradient'
    },
    {
      title: 'A2 (Elementary)',
      description: 'Learners can understand frequently used expressions related to everyday life.',
      borderColor: 'border-blue',
      gradient: 'bg-blue-gradient'
    },
    {
      title: 'B1 (Intermediate)',
      description: 'Learners produce simple connected text on familiar topics, express opinions, and describe events, in a limited way.',
      borderColor: 'border-pink',
      gradient: 'bg-pink-gradient'
    },
    {
      title: 'B2 (Upper Intermediate)',
      description: 'Learners are capable of debating, discussing, and analyzing subjects in some depth.',
      borderColor: 'border-blue',
      gradient: 'bg-blue-gradient'
    },
    {
      title: 'C1 (Advanced)',
      description: 'Learners can understand a wide range of demanding, long texts and recognize implicit meaning.',
      borderColor: 'border-pink',
      gradient: 'bg-pink-gradient'
    },
    {
      title: 'C2 (Proficiency)',
      description: 'Learners at the C2 level have mastered the language.',
      borderColor: 'border-blue',
      gradient: 'bg-blue-gradient'
    }
  ];

  return (
    <section id="levels" className="flex flex-col justify-center items-center px-5 md:px-10 py-20 gap-5 md:gap-10 bg-noisy-card bg-gradient-to-r  m-16">
      <h2 className="font-dela-gothic-one text-4xl lg:text-5xl !leading[100%] pb-2 text-white font-extrabold">
        Difficulty Levels
      </h2>
      <div className="max-w-5xl mx-auto px-8">
      
    </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-3 md:gap-5 w-full max-w-[1000px] ">
        {levels.map((level, index) => (
          <div 
            key={index}
            className={`border ${level.borderColor} flex flex-col gap-3 lg:gap-5 p-5 lg:p-10 rounded-xl lg:rounded-2xl bg-[#111111]`}
          >
            <h3 className= "font-dela-gothic-one text-xl lg:text-2xl !leading-[110%] bg-clip-text text-transparent text-purple-400 bg-purple-400 font-extrabold">
              {level.title}
            </h3>
            <p className="font-manrope font-medium text-base !leading-normal tracking-[.02em] text-white">
              {level.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DifficultyLevelsSection;