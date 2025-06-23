import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-blue-100 via-white to-green-100 py-16">
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-xl w-full">
        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-center"
          style={{ color: 'black' }}
        >
          Welcome to <span className="block">Shuttle Tracker</span>
        </h1>
        <p
          className="text-xl md:text-2xl mb-10 text-center font-medium"
          style={{ color: 'black' }}
        >
          Track the NST college shuttle in real-time and request hassle-free pickups.
        </p>
        <div className="flex w-full justify-center">
          <button
            className="px-10 py-4 text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={() => navigate('/student-login')}
          >
            Student
          </button>
          <button
            className="px-10 py-4 text-lg font-semibold rounded-xl shadow-lg bg-gradient-to-r from-green-600 to-green-400 text-white hover:from-green-700 hover:to-green-500 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
            style={{ marginLeft: '24px' }}
            onClick={() => navigate('/driver-login')}
          >
            Driver
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home; 