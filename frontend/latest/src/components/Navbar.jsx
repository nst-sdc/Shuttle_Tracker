import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import Logo from '../assets/logo/shuttle-tracker-logo.svg?react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.classList.toggle('menu-open', !isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white p-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-10 transition-colors duration-200">
      <Link
        to="/"
        className="text-white text-xl font-bold no-underline flex items-center gap-2"
      >
      
        <Logo style={{ height: '2.2rem', width: 'auto', display: 'block' }} />
      </Link>

      {/* Mobile menu button */}
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

      {/* Desktop navigation */}
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
          to="/schedule"
          className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
        >
          Track Shuttle
        </Link>
        <ThemeToggle />
      </div>

      {/* Mobile navigation overlay */}
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
              to="/schedule"
              className="text-white no-underline px-5 py-3 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors"
              onClick={toggleMenu}
            >
              Schedule
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
