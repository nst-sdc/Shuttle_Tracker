import React, { useEffect, useState } from 'react';
import BusCard from '../components/BusCard';
import toast, { Toaster } from 'react-hot-toast';
import TrackShuttle from './TrackShuttle';

function Driver() {
  const [dateTime, setDateTime] = useState(new Date());
  const [showForm, setShowForm] = useState(true); // show form first
  const [showLogin, setShowLogin] = useState(false); // then login
  const [isLoggedIn, setIsLoggedIn] = useState(false); // then buscard
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [driverName, setDriverName] = useState('');
  const [busNo, setBusNo] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [location, setLocation] = useState('Campus');
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form submit handler
  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!driverName || !busNo || !mobileNo || !location) {
      toast.error('Please fill all the details.', {
        position: 'top-center',
        style: { fontSize: '1.1rem', fontWeight: 'bold' },
        duration: 2000,
      });
      return;
    }
    setShowForm(false);
    setShowLogin(true);
    toast.success('Details saved! Please login.', {
      position: 'top-center',
      style: { fontSize: '1.1rem', fontWeight: 'bold' },
      duration: 1200,
      iconTheme: { primary: '#22c55e', secondary: '#fff' },
    });
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'driver@example.com' && password === 'password') {
        toast.success('Driver logged in successfully', {
          position: 'top-center',
          style: { fontSize: '1.1rem', fontWeight: 'bold' },
          duration: 1200,
          iconTheme: { primary: '#22c55e', secondary: '#fff' },
        });
        setTimeout(() => {
          setShowLogin(false);
          setIsLoggedIn(true);
        }, 1200);
      } else if (email && password) {
        toast.error('Incorrect email or password', {
          position: 'top-center',
          style: { fontSize: '1.1rem', fontWeight: 'bold' },
          duration: 2500,
        });
      } else {
        toast.error('Something went wrong. Please try again.', {
          position: 'top-center',
          style: { fontSize: '1.1rem', fontWeight: 'bold' },
          duration: 2500,
        });
      }
    }, 1000);
  };

  if (showForm) {
    return (
      <div className="flex flex-col items-center justify-center w-full px-4 py-6 md:py-8 bg-white dark:bg-gray-900 min-h-[70vh]">
        <Toaster />
        <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Driver Details
          </h2>
          <form onSubmit={handleDetailsSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Driver Name
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Bus Number
              </label>
              <input
                type="text"
                value={busNo}
                onChange={(e) => setBusNo(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter bus number"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                required
                pattern="[0-9]{10}"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Campus">Campus</option>
                <option value="Hostel">Hostel</option>
                <option value="On the Way">On the Way</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-white font-medium rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
            >
              Next: Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return (
      <div className="flex flex-col items-center justify-start w-full px-4 py-6 md:py-8 bg-white dark:bg-gray-900 min-h-[70vh]">
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontSize: '1.1rem', fontWeight: 'bold' },
            duration: 2500,
            success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            className: 'animate__animated animate__fadeInDown',
          }}
        />
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="p-3 rounded-xl bg-transparent">
              <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500">
                <div className="w-5 h-5 md:w-6 md:h-6 border-4 border-white dark:border-gray-800 rounded-full border-t-transparent border-l-transparent transform rotate-45"></div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <h6 className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">
              Stay on schedule. Keep students moving.
            </h6>

            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              Don't have an account yet?{' '}
              <a className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">
                Sign up
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="w-full pl-10 pr-4 py-2.5 md:py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2.5 md:py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Forgot password link positioned right after password field */}
            <div className="flex justify-end -mt-1 mb-1">
              <a
                type="button"
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:underline focus:outline-none"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 md:py-3 px-4 text-white font-medium rounded-lg transition-colors ${
                isLoading
                  ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <div className="px-4 py-6 sm:p-8 max-w-3xl mx-auto">
        <div className="text-sm sm:text-base text-center font-bold text-gray-600 dark:text-gray-300 mb-4">
          {dateTime.toLocaleString()}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
          Driver Dashboard
        </h1>
        <BusCard
          driverName={driverName}
          busNo={busNo}
          mobileNo={mobileNo}
          location={location}
          onLocationUpdate={setDriverLocation}
          isDriver={true}
        />
        {/* Show map only when route started (driverLocation available) */}
        {driverLocation && (
          <div className="mt-8">
            <TrackShuttle driverLocation={driverLocation} />
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default Driver;
