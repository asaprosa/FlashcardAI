'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AutoContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!mounted) {
    return (
      <nav className="fixed w-full top-0 z-50 bg-black bg-gradient-to-r from-purple-800/30 via-black to-purple-900/30 animate-gradient backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <div className="w-10 h-10" /> {/* Logo placeholder */}
            </div>
            <div className="w-20" /> {/* Auth buttons placeholder */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full top-0 z-50 bg-black bg-gradient-to-r from-purple-800/30 via-black to-purple-900/30 animate-gradient backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            
              <Image
                src="/cat.svg"
                alt="Logo"
                width={45}
                height={45}
                className="w-auto h-10"
                onClick={() => user ? router.push('/dashboard') : router.push('/')}
              />
            
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-300 hover:text-white p-2 rounded-full transition-colors"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" 
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;