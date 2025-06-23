import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Driver() {
  const [dateTime, setDateTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      if (email === 'driver@gmail.com' && password === 'password') {
        setLoggedIn(true);
        toast.success('Driver logged in successfully');
      } else if (email && password) {
        toast.error('Incorrect email or password');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    }, 1000);
  };

  return (
    <div style={containerStyle}>
      <div style={timeStyle}>
        {dateTime.toLocaleString()}
      </div>
      <h1 style={titleStyle}>Driver Dashboard</h1>
      {!loggedIn ? (
        <form onSubmit={handleLogin} style={{ maxWidth: 400, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f4f4f5', padding: '2rem', borderRadius: 12 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: '0.75rem', borderRadius: 6, border: '1px solid #ccc', fontSize: '1rem' }}
          />
          <button type="submit" disabled={loading} style={{ background: '#2563eb', color: '#fff', fontWeight: 600, padding: '0.75rem', borderRadius: 6, border: 'none', fontSize: '1rem', cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      ) : (
        <p style={descriptionStyle}>View pickup requests and manage your route here.</p>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Driver; 