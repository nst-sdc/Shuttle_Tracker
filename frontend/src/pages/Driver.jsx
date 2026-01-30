import React, { useEffect, useState } from "react";
import BusCard from "../components/BusCard";
import toast, { Toaster } from "react-hot-toast";
import TrackShuttle from "./TrackShuttle";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Bus, Phone, MapPin } from "lucide-react";

const BACKEND_URL = "https://shuttle-tracker.onrender.com";

function Driver({ setUserType }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [showForm, setShowForm] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [driverName, setDriverName] = useState("");
  const [busNo, setBusNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [location, setLocation] = useState("Campus");
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const user = localStorage.getItem("driver_user");
    const details = localStorage.getItem("driver_details");

    if (token && user) {
      const userData = JSON.parse(user);
      setEmail(userData.email);
      setShowForm(false);
      setShowLogin(false);
      setIsLoggedIn(true);
      if (setUserType) setUserType("driver");

      if (details) {
        const { driverName, busNo, mobileNo, location } = JSON.parse(details);
        setDriverName(driverName);
        setBusNo(busNo);
        setMobileNo(mobileNo);
        setLocation(location);
      }
    }
  }, [setUserType]);

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!driverName || !busNo || !mobileNo || !location) {
      toast.error("Please fill all details");
      return;
    }
    localStorage.setItem(
      "driver_details",
      JSON.stringify({
        driverName,
        busNo,
        mobileNo,
        location,
      }),
    );
    setShowForm(false);
    setShowLogin(true);
    toast.success("Details saved! Please login.");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating login - replace with actual API call if needed
    setTimeout(() => {
      setIsLoading(false);
      if (
        (email === "driver@example.com" && password === "password") ||
        (email && password)
      ) {
        setShowLogin(false);
        setIsLoggedIn(true);
        if (setUserType) setUserType("driver");
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid credentials");
      }
    }, 1000);
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
      const data = await res.json();
      if (res.ok && data.token && data.user) {
        localStorage.setItem("jwt_token", data.token);
        localStorage.setItem("driver_user", JSON.stringify(data.user));
        setEmail(data.user.email);
        setShowLogin(false);
        setIsLoggedIn(true);
        if (setUserType) setUserType("driver");
        toast.success("Logged in with Google");
      } else {
        toast.error(data.error || "Google login failed");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("driver_user");
    // localStorage.removeItem('driver_details'); // Keep details?
    setIsLoggedIn(false);
    setShowLogin(true);
    if (setUserType) setUserType(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        {showForm && (
          <motion.div
            key="details-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto mt-10 relative"
          >
            {/* Subtle Glow */}
            <div className="absolute -inset-1 bg-gray-200 dark:bg-gray-800 rounded-[2rem] blur opacity-20" />
            <div className="relative glass-panel p-8 md:p-10 rounded-[2rem] border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Driver Details
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                  Fill in your information to start the route
                </p>
              </div>

              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <InputField
                  label="Driver Name"
                  icon={User}
                  value={driverName}
                  onChange={setDriverName}
                  placeholder="Enter your full name"
                />

                <InputField
                  label="Bus Number"
                  icon={Bus}
                  value={busNo}
                  onChange={setBusNo}
                  placeholder="ex. MH-12-AB-1234"
                />

                <InputField
                  label="Mobile Number"
                  icon={Phone}
                  value={mobileNo}
                  onChange={setMobileNo}
                  placeholder="ex. 9876543210"
                  type="tel"
                />

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    Start Location
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-foreground transition-colors pointer-events-none">
                      <MapPin size={20} />
                    </div>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:border-gray-400 outline-none transition-all appearance-none text-gray-900 dark:text-white"
                      required
                    >
                      <option value="Campus">Campus</option>
                      <option value="Hostel">Hostel</option>
                      <option value="On the Way">On the Way</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none">
                      <motion.div
                        animate={{ y: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-400" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold shadow-lg shadow-gray-200/50 dark:shadow-none transition-all text-lg mt-4"
                >
                  Next Step
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}

        {showLogin && (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg mx-auto mt-10 relative"
          >
            <div className="absolute -inset-1 bg-gray-200 dark:bg-gray-800 rounded-[2rem] blur opacity-20" />
            <div className="relative glass-panel p-8 md:p-10 rounded-[2rem] border border-white/20 dark:border-white/10 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome Back
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                  Sign in to manage your trip
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:border-gray-400 outline-none transition-all"
                    placeholder="driver@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:border-gray-400 outline-none transition-all"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold shadow-lg shadow-gray-200/50 dark:shadow-none transition-all text-lg"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white dark:text-black"
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
                      Processing...
                    </span>
                  ) : (
                    "Secure Login"
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200 dark:border-gray-700"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-black px-2 text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => toast.error("Google login failed")}
                  useOneTap
                  theme="outline"
                  width="100%"
                  shape="circle"
                />
              </form>
            </div>
          </motion.div>
        )}

        {isLoggedIn && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold">Driver Dashboard</h1>
                <p className="text-muted-foreground">
                  {dateTime.toLocaleString()}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <BusCard
              driverName={driverName}
              busNo={busNo}
              mobileNo={mobileNo}
              location={location}
              onLocationUpdate={setDriverLocation}
              isDriver={true}
              onLogout={handleLogout}
            />

            {driverLocation && (
              <div className="mt-8 flex-1">
                <TrackShuttle driverLocation={driverLocation} />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const InputField = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-foreground transition-colors pointer-events-none">
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-gray-50/50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:border-gray-400 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
);

export default Driver;
