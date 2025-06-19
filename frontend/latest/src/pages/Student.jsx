import React, { useEffect, useState } from 'react';

function Student() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: '#475569' }}>
        {dateTime.toLocaleString()}
      </div>
      <h1 style={{ color: '#1e293b' }}>Student Dashboard</h1>
      <p style={{ color: '#334155' }}>Track your shuttle and request pickups here.</p>
    </div>
  );
}

export default Student; 