import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Student from './pages/Student';
import Driver from './pages/Driver';
import Schedule from './pages/Schedule';
import Footer from './components/Footer';

function App() {
  const [dark, setDark] = useState(() => {
    const theme = localStorage.getItem("theme");
    if (theme) return theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <Router>
      <div style={{ minHeight: '100vh', width: '100vw' }}>
        <Navbar />
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
          <button onClick={() => setDark(d => !d)}>
            Switch to {dark ? "Light" : "Dark"} Mode
          </button>
        </div>
        <main style={{
          width: '100%',
          padding: '2rem',
          boxSizing: 'border-box',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
