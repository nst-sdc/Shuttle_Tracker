import React from 'react';
import mainLogo from '../assets/logo/main-logo.png';
import { Link } from 'react-router-dom';
import { GlobeIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons';
function Footer() {
  const footerConfig = [
    { heading: 'Home', link: '/', icon: <HomeIcon /> },
    { heading: 'Map', link: '/track-shuttle', icon: <GlobeIcon /> },
    { heading: 'Profile', link: '/student', icon: <PersonIcon /> },
  ];

  return (
    <footer className="bg-blue-600 dark:bg-gray-800 text-white p-4 text-center w-full mt-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 sm:justify-items-center md:justify-items-between lg:justfiy-items-between">
      <div>
        <Link
          to="/"
          className="logo-link no-underline flex items-center gap-2 focus:outline-none"
          aria-label="Shuttle Tracker Home"
        >
          <img
            src={mainLogo}
            alt="Shuttle Tracker Logo"
            // Adjusted classes for smaller visibility
            className="h-10 md:h-14 lg:h-16 max-w-[120px] sm:max-w-[180px] lg:max-w-[240px] object-contain"
          />
        </Link>
      </div>

      {/* lists with icons  */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-items-between ">
        <div>
          <ul>
            {footerConfig.map((elem) => (
              <Link key={elem.link} to={elem.link}>
                <li className="text-white flex items-center gap-2">
                  {elem.icon}
                  {elem.heading}
                </li>
              </Link>
            ))}
          </ul>
          <div className="text-white text-xs py-2 w-full text-center">
            © {new Date().getFullYear()} Shuttle Tracker. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
