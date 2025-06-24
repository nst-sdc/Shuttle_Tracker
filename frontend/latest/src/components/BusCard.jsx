import React from 'react';

const bounceAnimation = {
  display: 'inline-block',
  animation: 'bounce 1.6s infinite ease-in-out'
};

const styles = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.08)',
    border: '1px solid #e5e7eb',
    padding: '28px 24px',
    maxWidth: '400px',
    margin: '32px auto',
    fontFamily: 'inherit',
    position: 'relative'
  },
  header: {
    textAlign: 'center',
    marginBottom: '6px',
    fontWeight: 700,
    fontSize: '22px',
    color: '#1a202c'
  },
  directionBadge: {
    display: 'inline-block',
    backgroundColor: '#eff6ff',
    color: '#2563eb',
    fontSize: '13px',
    fontWeight: 600,
    padding: '4px 12px',
    borderRadius: '9999px',
    marginBottom: '18px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6'
  },
  label: {
    color: '#2563eb',
    fontWeight: 500,
    fontSize: '15px'
  },
  value: {
    color: '#1a202c',
    fontWeight: 600,
    fontSize: '15px'
  },
  status: {
    marginTop: '18px',
    background: '#bbf7d0',
    color: '#166534',
    borderRadius: '20px',
    padding: '6px 0',
    textAlign: 'center',
    fontWeight: 600,
    fontSize: '13px'
  }
};

const addKeyframes = () => {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
  `;
  document.head.appendChild(style);
};
addKeyframes();

const BusCard = () => {
  const dummyBus = {
    busNumber: 'MH-12-AB-1234',
    driverName: 'Rajesh Kumar',
    currentLocation: 'Your space',
    estimatedArrival: '8 mins',
    status: 'On Time',
    direction: 'To College'
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.header}>
        <span style={bounceAnimation}>🚌</span> Bus Card
      </h2>

      <div style={{ textAlign: 'center' }}>
        <span style={styles.directionBadge}>
          {dummyBus.direction === 'To College' ? '🔼 To College' : '🔽 To Hostel'}
        </span>
      </div>

      <div style={styles.infoRow}>
        <p style={styles.label}>🚌 Bus Number:</p>
        <p style={styles.value}>{dummyBus.busNumber}</p>
      </div>
      <div style={styles.infoRow}>
        <p style={styles.label}>👨‍✈️ Driver Name:</p>
        <p style={styles.value}>{dummyBus.driverName}</p>
      </div>
      <div style={styles.infoRow}>
        <p style={styles.label}>📍 Current Location:</p>
        <p style={styles.value}>{dummyBus.currentLocation}</p>
      </div>
      <div style={styles.infoRow}>
        <p style={styles.label}>⏰ Estimated Arrival:</p>
        <p style={styles.value}>{dummyBus.estimatedArrival}</p>
      </div>

      <div style={styles.status}>
        <p>{dummyBus.status}</p>
      </div>
    </div>
  );
};

export default BusCard;
