import React from 'react';
import { Home, MapPin, User } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full bg-blue-600 dark:bg-gray-800 text-white shadow-md z-50">
      <div className="flex justify-around items-center py-3">
        {/* Home */}
        <Link
          to="/"
          className="flex flex-col items-center text-white hover:opacity-80"
        >
          <Home size={24} />
          <span>Home</span>
        </Link>

        {/* Track Shuttle */}
        <Link
          to="/track-shuttle"
          className="flex flex-col items-center text-white hover:opacity-80"
        >
          <MapPin size={24} />
          <span>Track&nbsp;Shuttle</span>
        </Link>

        {/* Profile */}
        <Link
          to="/driver"
          className="flex flex-col items-center text-white hover:opacity-80"
        >
          <User size={24} />
          <span>Profile</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
