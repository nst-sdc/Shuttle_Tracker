import React from "react";
import { Home, MapPin, User, Github, Twitter, Linkedin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function Footer({ userType }) {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto relative z-40">
      {/* Decorative top border gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="glass-panel border-t border-white/10 bg-white/60 dark:bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start space-y-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2 rounded-lg">
                  <span className="text-white font-bold text-lg">ST</span>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
                  ShuttleTracker
                </span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left max-w-xs">
                real-time campus mobility solution for students and drivers.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Quick Navigation
              </h3>
              <nav className="flex flex-wrap justify-center gap-6">
                <FooterLink
                  to="/"
                  icon={Home}
                  label="Home"
                  active={location.pathname === "/"}
                />
                <FooterLink
                  to="/track-shuttle"
                  icon={MapPin}
                  label="Track"
                  active={location.pathname === "/track-shuttle"}
                />

                {userType === "driver" && (
                  <FooterLink
                    to="/driver"
                    icon={User}
                    label="Driver Profile"
                    active={location.pathname === "/driver"}
                  />
                )}
                {userType === "student" && (
                  <FooterLink
                    to="/student"
                    icon={User}
                    label="Student Profile"
                    active={location.pathname === "/student"}
                  />
                )}
              </nav>
            </div>

            {/* Socials / Contact */}
            <div className="flex flex-col items-center md:items-end space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Connect
              </h3>
              <div className="flex space-x-4">
                <SocialIcon icon={Github} href="#" />
                <SocialIcon icon={Twitter} href="#" />
                <SocialIcon icon={Linkedin} href="#" />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; {currentYear} ShuttleTracker. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <Link to="#" className="hover:text-blue-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-blue-500 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
      active
        ? "text-blue-600 dark:text-blue-400"
        : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300"
    }`}
  >
    <Icon size={16} />
    <span>{label}</span>
  </Link>
);

const SocialIcon = ({ icon: Icon, href }) => (
  <a
    href={href}
    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
  >
    <Icon size={18} />
  </a>
);

export default Footer;
