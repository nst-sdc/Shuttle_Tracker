import React, { useEffect, useState } from 'react';
// import BusCard from '../components/BusCard';

function Driver() {
  const [dateTime, setDateTime] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-start w-full px-4 py-6 md:py-8 bg-white dark:bg-gray-900 min-h-[70vh]">
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

          {/* Removing the original forgot password link at bottom */}
        </div>
      </div>
    );
  }

  // Dashboard after login
  return (
    <div className="px-4 py-6 sm:p-8 max-w-3xl mx-auto">
      <div className="text-sm sm:text-base text-center font-bold text-gray-600 dark:text-gray-300 mb-4">
        {dateTime.toLocaleString()}
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
        Student Dashboard
      </h1>

      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed">
        Track your shuttle and request pickups here.
      </p>

      {/* <BusCard /> */}
    </div>
  );
}

export default Driver;