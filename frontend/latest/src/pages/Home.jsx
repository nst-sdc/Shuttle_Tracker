import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#1e293b', textAlign: 'center' }}>Welcome to Shuttle Tracker 🚍</h1>
      <p style={{ color: '#334155', textAlign: 'center' }}>Track the NST college shuttle in real-time and request hassle-free pickups.</p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
        <button onClick={() => navigate('/student')}>I am a Student</button>
        <button onClick={() => navigate('/driver')}>I am a Driver</button>
      </div>
    </div>
  );
}

export default Home; 