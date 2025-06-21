import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo/shuttle-tracker-logo.svg?react';

function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    display: 'block',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }
  };

  return (
    <nav style={{
      backgroundColor: '#2563eb',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Logo on the left */}
      <Link to="/" style={{ 
        color: '#fff', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <Logo style={{ height: '2.2rem', width: 'auto', display: 'block' }} />
      </Link>

      {/* Hamburger menu button on the right (mobile only) */}
      <button 
        onClick={toggleMenu}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: '1.5rem',
          cursor: 'pointer',
          padding: '0.5rem',
          zIndex: 1001,
          minWidth: '44px',
          minHeight: '44px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="mobile-menu-btn"
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      {/* Desktop navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem',
        alignItems: 'center',
        height: '100%',
        minWidth: 0,
        whiteSpace: 'nowrap',
      }} className="desktop-nav">
        <Link to="/" style={{...navLinkStyle, margin: 0, paddingTop: 0, paddingBottom: 0, whiteSpace: 'nowrap'}} onClick={closeMenu}>Home</Link>
        <Link to="/student" style={{...navLinkStyle, margin: 0, paddingTop: 0, paddingBottom: 0, whiteSpace: 'nowrap'}} onClick={closeMenu}>Student</Link>
        <Link to="/driver" style={{...navLinkStyle, margin: 0, paddingTop: 0, paddingBottom: 0, whiteSpace: 'nowrap'}} onClick={closeMenu}>Driver</Link>
        <Link to="/schedule" style={{...navLinkStyle, margin: 0, paddingTop: 0, paddingBottom: 0, whiteSpace: 'nowrap'}} onClick={closeMenu}>Schedule</Link>
        <button 
          onClick={toggleTheme} 
          style={{ 
            marginLeft: '1rem', 
            background: 'none', 
            color: '#fff', 
            border: '1px solid #fff',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginTop: 0,
            marginBottom: 0,
            height: 'auto',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      {/* Mobile navigation overlay */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#2563eb',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          zIndex: 1000
        }}
        className="mobile-nav-overlay"
      >
        <Link to="/" style={{...navLinkStyle, fontSize: '1.2rem'}} onClick={closeMenu}>Home</Link>
        <Link to="/student" style={{...navLinkStyle, fontSize: '1.2rem'}} onClick={closeMenu}>Student</Link>
        <Link to="/driver" style={{...navLinkStyle, fontSize: '1.2rem'}} onClick={closeMenu}>Driver</Link>
        <Link to="/schedule" style={{...navLinkStyle, fontSize: '1.2rem'}} onClick={closeMenu}>Schedule</Link>
        <button 
          onClick={toggleTheme} 
          style={{ 
            background: 'none', 
            color: '#fff', 
            border: '1px solid #fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
        >
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 