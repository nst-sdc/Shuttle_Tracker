import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Student from './pages/Student';
import Driver from './pages/Driver';
import Schedule from './pages/Schedule';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main className="w-full p-8 box-border">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<Student />} />
            <Route path="/driver" element={<Driver />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
