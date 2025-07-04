import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Student from './pages/Student';
import Driver from './pages/Driver';
import TrackShuttle from './pages/TrackShuttle';
import Footer from './components/Footer';
import Profile from './pages/Profile';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main className="w-full flex-grow">
          <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student" element={<Student />} />
              <Route path="/driver" element={<Driver />} />
              <Route path="/track-shuttle" element={<TrackShuttle />} />
              <Route path="/home" element={<Home />} />
              <Route path="/map" element={<TrackShuttle />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
