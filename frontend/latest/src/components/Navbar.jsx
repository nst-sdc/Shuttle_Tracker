import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white p-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-10 transition-colors duration-200">
      <Link to="/" className="no-underline flex items-center gap-2">
        {/* 🔥 Enhanced Inline SVG Logo */}
        <div className="w-[320px] h-auto">
          <svg viewBox="0 0 460 90" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="pinkGrad" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#ff5f6d" />
                <stop offset="100%" stopColor="#ffc371" />
              </linearGradient>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#00c6ff" />
                <stop offset="100%" stopColor="#0072ff" />
              </linearGradient>
            </defs>

            <text x="0" y="40" fontFamily="Fredoka, Arial, sans-serif" fontSize="32" fontWeight="700" fill="url(#pinkGrad)">
              SHUTTLE
            </text>

            <g transform="translate(160,10)">
              <rect x="0" y="10" width="36" height="20" rx="4" fill="#00e6e6" />
              <circle cx="8" cy="32" r="4" fill="#1e293b" />
              <circle cx="28" cy="32" r="4" fill="#1e293b" />
              <rect x="4" y="12" width="10" height="8" fill="white" />
              <rect x="20" y="12" width="10" height="8" fill="white" />
            </g>

            <text x="210" y="40" fontFamily="Fredoka, Arial, sans-serif" fontSize="32" fontWeight="700" fill="url(#blueGrad)">
              TRACKER
            </text>

            <text x="0" y="70" fontFamily="Arial, sans-serif" fontSize="13" fill="#cbd5e1" letterSpacing="0.5px">
              YOUR SHUTTLE. YOUR SCHEDULE.
            </text>
          </svg>
        </div>
      </Link>

      {/* 📱 Mobile menu button */}
      <button
        className="mobile-menu-btn lg:hidden text-white p-2 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <span className="text-2xl">✕</span>
        ) : (
          <span className="text-2xl">☰</span>
        )}
      </button>

      {/* 💻 Desktop nav links */}
      <div className="hidden lg:flex items-center gap-6">
        <Link
          to="/"
          className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/student"
          className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
        >
          Student
        </Link>
        <Link
          to="/driver"
          className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
        >
          Driver
        </Link>
        <Link
          to="/track-shuttle"
          className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
        >
          Track Shuttle
        </Link>
        <ThemeToggle />
      </div>

      {/* 📱 Mobile nav overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-blue-800/95 dark:bg-gray-900/95 z-50 flex flex-col items-center justify-center mobile-nav-overlay">
          <button
            className="absolute top-4 right-8 text-white text-2xl"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
          <div className="flex flex-col items-center gap-6 text-xl">
            <Link
              to="/"
              className="text-white no-underline px-5 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/student"
              className="text-white no-underline px-5 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
            >
              Student
            </Link>
            <Link
              to="/driver"
              className="text-white no-underline px-5 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
            >
              Driver
            </Link>
            <Link
              to="/track-shuttle"
              className="text-white no-underline px-5 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
            >
              Track Shuttle
            </Link>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
