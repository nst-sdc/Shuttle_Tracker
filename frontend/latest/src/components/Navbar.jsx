import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

function Navbar() {
  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white p-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-10 transition-colors duration-200">
      <Link to="/" className="text-white text-xl font-bold no-underline flex items-center gap-2">
        <span className="text-2xl">🚍</span>
        <span>Shuttle Tracker</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors">Home</Link>
        <Link to="/student" className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors">Student</Link>
        <Link to="/driver" className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors">Driver</Link>
        <Link to="/schedule" className="text-white no-underline px-3 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-gray-700 transition-colors">Schedule</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar; 