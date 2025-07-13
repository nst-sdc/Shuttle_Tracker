import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ userType, setUserType }) {
  const navigate = useNavigate();
  
  const containerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    marginBottom: '1rem',
    color: 'var(--text)'
  };

  const descriptionStyle = {
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    marginBottom: '2rem',
    color: 'var(--text)',
    opacity: 0.8,
    lineHeight: 1.6
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '2rem'
  };

  const buttonStyle = {
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    minWidth: '140px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Shuttle Tracker 🚍</h1>
      <p style={descriptionStyle}>
        Track the NST college shuttle in real-time and request hassle-free pickups.
      </p>
      <div style={buttonContainerStyle}>
        {(!userType || userType === 'student') && (
          <button 
            onClick={() => {
              setUserType('student');
              navigate('/student');
            }} 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            I am a Student
          </button>
        )}
        {(!userType || userType === 'driver') && (
          <button 
            onClick={() => {
              setUserType('driver');
              navigate('/driver');
            }} 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#1d4ed8';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            I am a Driver
          </button>
        )}
      </div>
    </div>
  );
}

export default Home; 