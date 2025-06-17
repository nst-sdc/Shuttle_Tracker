import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import DriverDashboard from "./components/DriverDashboard.jsx"
import StudentDashboard from './components/StudentDashboard.jsx';
import Schedule from './components/Schedule.jsx';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{ marginTop: '80px' }}>
          <Routes>
            <Route path="/" element={
              <main style={{ textAlign: 'center', padding: '2rem' }}>
                <h1>Shuttle Tracker</h1>
                <p>Track the NST college shuttle in real-time and request hassle-free pickups.</p>
              </main>
            } />
            <Route path="/driver" element={<DriverDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
