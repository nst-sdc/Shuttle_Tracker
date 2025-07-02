import React, { useEffect, useState } from 'react';
import BusCard from '../components/BusCard';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function Student() {
  const [dateTime, setDateTime] = useState(new Date());
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle Google OAuth redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      login(token);
      // Remove token from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [login]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok && data.token) {
        login(data.token);
        toast.success('Welcome back, Student!', { position: 'top-center', duration: 1200 });
      } else {
        toast.error(data.error || 'Incorrect email or password', { position: 'top-center', duration: 2500 });
      }
    } catch (err) {
      setIsLoading(false);
      toast.error('Something went wrong. Please try again.', { position: 'top-center', duration: 2500 });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'student', name }),
      });
      const data = await res.json();
      setIsLoading(false);
      if (res.ok) {
        // Auto-login after sign up
        const loginRes = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.token) {
          login(loginData.token);
          toast.success('Sign up successful! Logging you in...', { position: 'top-center', duration: 1500 });
        } else {
          toast.success('Sign up successful! Please log in.', { position: 'top-center', duration: 1500 });
          setIsSignUp(false);
        }
      } else {
        toast.error(data.error || 'Sign up failed', { position: 'top-center', duration: 2500 });
      }
    } catch (err) {
      setIsLoading(false);
      toast.error('Sign up failed', { position: 'top-center', duration: 2500 });
    }
  };

  if (!user) {
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
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
              {isSignUp ? (
                <>Already have an account?{' '}
                  <button
                    type="button"
                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none bg-transparent shadow-none p-0 m-0 border-none"
                    style={{ background: 'none', boxShadow: 'none' }}
                    onClick={() => setIsSignUp(false)}
                  >
                    Login
                  </button>
                </>
              ) : (
                <>Don't have an account yet?{' '}
                  <button
                    type="button"
                    className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none bg-transparent shadow-none p-0 m-0 border-none"
                    style={{ background: 'none', boxShadow: 'none' }}
                    onClick={() => setIsSignUp(true)}
                  >
                    Sign up
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Form */}
          {isSignUp ? (
            <form onSubmit={handleSignUp} className="w-full space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2zm0 10a4 4 0 110-8 4 4 0 010 8z" /></svg>
                </div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Full Name" className="w-full pl-10 pr-4 py-2.5 md:py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email address" className="w-full pl-10 pr-4 py-2.5 md:py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full pl-10 pr-4 py-2.5 md:py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <button type="submit" disabled={isLoading} className={`w-full py-2.5 md:py-3 px-4 text-white font-medium rounded-lg transition-colors ${isLoading ? 'bg-blue-400 dark:bg-blue-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'}`}>{isLoading ? 'Signing up...' : 'Sign Up'}</button>
            </form>
          ) : (
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
          )}

          {/* Google Login Button */}
          <div className="mt-4 flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'}/api/auth/google?role=student`;
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 px-4 bg-white border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200 font-medium mt-2"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>

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

      <BusCard />
    </div>
  );
}

export default Student;
