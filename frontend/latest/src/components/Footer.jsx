import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MapPin, User } from 'lucide-react';

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-blue-600 dark:bg-gray-800 text-white shadow-md z-50">
      <div className="flex justify-around items-center py-3">
        <Link to="/home" className="flex flex-col items-center text-sm text-white hover:opacity-80">
          <Home size={24} color="white" />
          <span>Home</span>
        </Link>
        <Link to="/map" className="flex flex-col items-center text-sm text-white hover:opacity-80">
          <MapPin size={24} color="white" />
          <span>Map</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-sm text-white hover:opacity-80">
          <User size={24} color="white" />
          <span>Profile</span>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
