import React, { useEffect, useState } from 'react';

function Student() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerStyle = {
    padding: 'clamp(1rem, 3vw, 2rem)',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const timeStyle = {
    marginBottom: '1rem',
    fontWeight: 'bold',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: '#475569',
    textAlign: 'center'
  };

  const titleStyle = {
    color: 'var(--text)',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    marginBottom: '1rem',
    textAlign: 'center'
  };

  const descriptionStyle = {
    color: 'var(--text)',
    opacity: 0.8,
    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
    textAlign: 'center',
    lineHeight: 1.6
  };

  return (
    <div style={containerStyle}>
      <div style={timeStyle}>
        {dateTime.toLocaleString()}
      </div>
      <h1 style={titleStyle}>Student Dashboard</h1>
      <p style={descriptionStyle}>Track your shuttle and request pickups here.</p>
    </div>
  );
}

export default Student; 