import React, { useState } from 'react';

function DriverLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold mb-6 text-center" style={{ color: 'black' }}>Driver Login</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div>
            <label className="block font-medium mb-2" htmlFor="username" style={{ color: 'black' }}>Username</label>
            <input
              id="username"
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-green-50 transition bg-white text-black placeholder-gray-400 shadow-sm text-base"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={{ color: 'black' }}
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block font-medium mb-2" htmlFor="password" style={{ color: 'black' }}>Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-green-50 transition bg-white text-black placeholder-gray-400 shadow-sm text-base"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{ color: 'black' }}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 text-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 mt-2"
            style={{ letterSpacing: '0.5px' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default DriverLogin; 