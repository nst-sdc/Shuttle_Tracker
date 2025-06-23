import React from 'react';

function Schedule() {
  const containerStyle = {
    padding: 'clamp(1rem, 3vw, 2rem)',
    maxWidth: '800px',
    margin: '0 auto'
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
      <h1 style={titleStyle}>Shuttle Schedule</h1>
      <p style={descriptionStyle}>View the complete shuttle schedule and timings.</p>
    </div>
  );
}

export default Schedule; 