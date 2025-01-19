import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-md border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          {/* Support Link */}
          <Link
            href="/support"
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Support Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;