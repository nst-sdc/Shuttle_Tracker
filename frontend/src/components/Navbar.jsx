import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogIn,
  Map,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

const Navbar = ({ userType, setUserType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("driver_user");
    if (setUserType) setUserType(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Student", path: "/student", icon: <User size={18} /> },
    { name: "Driver", path: "/driver", icon: <LogIn size={18} /> },
    { name: "Track", path: "/track-shuttle", icon: <Map size={18} /> },
    { name: "Login", path: "/login", icon: <LogIn size={18} /> },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "glass-panel bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-800/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 15 }}
                className="p-1 rounded-lg"
              >
                <img
                  src="/logo.png"
                  alt="ShuttleTracker Logo"
                  className="w-10 h-10 object-contain"
                />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 group-hover:from-blue-600 group-hover:to-indigo-500 transition-all duration-300">
                ShuttleTracker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <div className="flex items-center bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700 mr-4">
                {navLinks.map((link) => {
                  // If not logged in: show Home, Track, and Driver (will redirect to login)
                  if (!userType && link.name === "Student") return null;

                  // If driver: only show Driver (Dashboard)
                  if (userType === "driver" && link.name !== "Driver")
                    return null;

                  // If student: hide Driver link
                  if (userType === "student" && link.name === "Driver")
                    return null;

                  if (link.name === "Login" && userType) return null;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {link.icon}
                        {link.name === "Driver" && userType === "driver"
                          ? "Dashboard"
                          : link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
              {userType && (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="glass-panel text-white p-4 space-y-2 m-2 rounded-2xl">
                {navLinks.map((link, index) => {
                  // If not logged in: show Home, Track, and Driver
                  if (!userType && link.name === "Student") return null;

                  // If driver: only show Driver (Dashboard)
                  if (userType === "driver" && link.name !== "Driver")
                    return null;

                  // If student: hide Driver link
                  if (userType === "student" && link.name === "Driver")
                    return null;

                  if (link.name === "Login" && userType) return null;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                          location.pathname === link.path
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {link.icon}
                        <span className="font-medium">
                          {link.name === "Driver" && userType === "driver"
                            ? "Dashboard"
                            : link.name}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
                {userType && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
