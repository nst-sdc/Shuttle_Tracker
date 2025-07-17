import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Student from './pages/Student';
import Driver from './pages/Driver';
import TrackShuttle from './pages/TrackShuttle';
import Footer from './components/Footer';

function App() {
  const [userType, _setUserType] = useState(null);

  // Helper to update both state and localStorage
  const setUserType = useCallback((type) => {
    _setUserType(type);
    if (type) {
      localStorage.setItem('user_type', type);
    } else {
      localStorage.removeItem('user_type');
    }
  }, []);

  useEffect(() => {
    const driverToken = localStorage.getItem('jwt_token');
    const driverUser = localStorage.getItem('driver_user');
    if (driverToken && driverUser) {
      setUserType('driver');
      return;
    }
    const storedType = localStorage.getItem('user_type');
    if (storedType) {
      setUserType(storedType);
    }
  }, [setUserType]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar userType={userType} />
        <main className="w-full flex-grow">
          <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home userType={userType} setUserType={setUserType} />} />
              <Route path="/student" element={<Student setUserType={setUserType} />} />
              <Route path="/driver" element={<Driver setUserType={setUserType} />} />
              <Route path="/track-shuttle" element={<TrackShuttle />} />
            </Routes>
          </div>
        </main>
        <Footer userType={userType} />
      </div>
    </Router>
  );
}

export default App;
