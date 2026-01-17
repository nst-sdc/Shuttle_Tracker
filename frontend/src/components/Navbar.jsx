import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import mainLogo from "../assets/logo/main-logo.png";
import {
  Menu,
  X,
  LayoutDashboard,
  Home,
  User,
  Car,
  MapPin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ userType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.classList.remove("menu-open");
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle("menu-open", !isMenuOpen);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: Home, visible: true },
    {
      to: "/student",
      label: "Student",
      icon: User,
      visible: userType !== "driver",
    },
    {
      to: "/driver",
      label: "Driver",
      icon: Car,
      visible: userType !== "student",
    },
    {
      to: "/track-shuttle",
      label: "Track Shuttle",
      icon: MapPin,
      visible: true,
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel mx-4 mt-4 rounded-full px-6 py-3 bg-white/10 dark:bg-black/20"
            : "bg-transparent py-6 px-4 sm:px-8"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 focus:outline-none group"
            aria-label="Shuttle Tracker Home"
          >
            <motion.div whileHover={{ scale: 1.05 }} className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={mainLogo}
                alt="Shuttle Tracker Logo"
                className="h-10 w-auto relative z-10"
              />
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary hidden sm:block">
              ShuttleTracker
            </span>
          </Link>

          {/* 💻 Desktop nav links */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center bg-white/5 dark:bg-black/20 rounded-full p-1 border border-white/10 backdrop-blur-sm mr-4">
              {navLinks.map(
                (link) =>
                  link.visible && (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        location.pathname === link.to
                          ? "text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {location.pathname === link.to && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/25"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </span>
                    </Link>
                  ),
              )}
            </div>
            <ThemeToggle />
          </div>

          {/* 📱 Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* 📱 Mobile nav overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map(
                (link, index) =>
                  link.visible && (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.to}
                        className={`flex items-center gap-4 p-4 rounded-xl text-lg font-medium transition-colors ${
                          location.pathname === link.to
                            ? "bg-primary/20 text-primary border border-primary/20"
                            : "bg-white/5 hover:bg-white/10 border border-white/5"
                        }`}
                        onClick={toggleMenu}
                      >
                        <link.icon
                          className={`w-6 h-6 ${location.pathname === link.to ? "text-primary" : "text-muted-foreground"}`}
                        />
                        {link.label}
                      </Link>
                    </motion.div>
                  ),
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5"
            >
              <span className="text-muted-foreground">Appearance</span>
              <ThemeToggle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
