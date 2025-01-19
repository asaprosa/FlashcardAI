const Hero = () => {
  return (
    <div className="h-[calc(100vh-110px)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-dela-gothic-one), system-ui, apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif' }}>
        Generate Flashcards
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Please sign in to generate and use flashcards.
      </p>
      <div className="flex gap-4">
        <a
          href="/login"
          className="text-gray-300 hover:text-white px-6 py-3 rounded-md text-lg font-medium transition-colors  hover:border-gray-500"
        >
          Login
        </a>
        <a
          href="/register"
          className="text-purple-600 hover:text-purple-500  px-6 py-3 rounded-md text-lg font-medium transition-colors"
        >
          Sign Up
        </a>
      </div>
    </div>
  );
};

export default Hero;
