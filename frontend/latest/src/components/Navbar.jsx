import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import mainLogo from '../assets/logo/main-logo.png';

/**
 * Renders a responsive navigation bar with theme toggling and mobile menu support.
 *
 * Displays navigation links and a theme toggle for both desktop and mobile views. On smaller screens, provides a toggleable overlay menu for navigation. The navigation bar remains sticky at the top of the page and adapts its appearance based on the current theme.
 * @returns {JSX.Element} The rendered navigation bar component.
 */
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white py-6 px-8 flex justify-between items-center shadow-md sticky top-0 z-10 transition-colors duration-200">
      <Link
        to="/"
        className="logo-link no-underline flex items-center gap-2 focus:outline-none"
        aria-label="Shuttle Tracker Home"
      >
        <img 
          src={mainLogo} 
          alt="Shuttle Tracker Logo" 
          // Further adjusted classes for larger visibility
          className="h-12 md:h-20 lg:h-24 max-w-[180px] sm:max-w-[240px] lg:max-w-[320px] object-contain"
        />
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