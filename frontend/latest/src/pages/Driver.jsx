import React, { useEffect, useState } from 'react';

function Driver() {
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
      <h1 style={{ color: '#1e293b' }}>Driver Dashboard</h1>
      <p style={{ color: '#334155' }}>View pickup requests and manage your route here.</p>
    </div>
  );
}

export default Driver; 