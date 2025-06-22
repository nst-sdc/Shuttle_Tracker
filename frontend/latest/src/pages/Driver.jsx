import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function Driver() {
  const [dateTime, setDateTime] = useState(new Date());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login logic
    try {
      // Replace with real API call
      if (email === 'driver@example.com' && password === 'password') {
        toast.success('Driver logged in successfully');
      } else {
        toast.error('Incorrect email or password');
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', color: '#475569' }}>
        {dateTime.toLocaleString()}
      </div>
      <h1 style={{ color: '#1e293b' }}>Driver Dashboard</h1>
      <form onSubmit={handleLogin} style={{ maxWidth: 350, margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f1f5f9', padding: '2rem', borderRadius: 8 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #cbd5e1' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '0.5rem', borderRadius: 4, border: '1px solid #cbd5e1' }} />
        <button type="submit" disabled={loading} style={{ padding: '0.5rem', borderRadius: 4, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 'bold' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ color: '#334155' }}>View pickup requests and manage your route here.</p>
    </div>
  );
}

export default Driver;