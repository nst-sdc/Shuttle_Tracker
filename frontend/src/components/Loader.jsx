import React from 'react';

const Loader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '120px' }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '6px solid #2563eb',
      borderTop: '6px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <div style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#2563eb', fontWeight: '500', letterSpacing: '0.05em' }}>
      Loading...
    </div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader; 