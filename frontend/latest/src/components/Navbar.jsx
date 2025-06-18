import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
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
      <Link to="/" style={{ 
        color: '#fff', 
        fontSize: '1.5rem', 
        fontWeight: 'bold',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span style={{ fontSize: '1.8rem' }}>🚍</span>
        <span>Shuttle Tracker</span>
      </Link>
      <div style={{ 
        display: 'flex', 
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/student" style={navLinkStyle}>Student</Link>
        <Link to="/driver" style={navLinkStyle}>Driver</Link>
        <Link to="/schedule" style={navLinkStyle}>Schedule</Link>
      </div>
    </nav>
  );
}

export default Navbar; 