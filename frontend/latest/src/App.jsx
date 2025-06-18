import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Student from './pages/Student';
import Driver from './pages/Driver';
import Schedule from './pages/Schedule';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', width: '100vw' }}>
        <Navbar />
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
