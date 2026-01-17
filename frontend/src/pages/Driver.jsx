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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-8 rounded-2xl max-w-md mx-auto mt-10"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              Driver Details
            </h2>
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Driver Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full pl-10 px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bus Number</label>
                <div className="relative">
                  <Bus className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={busNo}
                    onChange={(e) => setBusNo(e.target.value)}
                    className="w-full pl-10 px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="MH-12-AB-1234"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="w-full pl-10 px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all appearance-none"
                    required
                  >
                    <option value="Campus">Campus</option>
                    <option value="Hostel">Hostel</option>
                    <option value="On the Way">On the Way</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium mt-4"
              >
                Next Step
              </button>
            </form>
          </motion.div>
        )}

        {showLogin && (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel p-8 rounded-2xl max-w-md mx-auto mt-10"
          >
            <h2 className="text-2xl font-bold mb-2 text-center">
              Driver Login
            </h2>
            <p className="text-muted-foreground text-center mb-6 text-sm">
              Sign in to manage your shuttle session
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="driver@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary/50 outline-none"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
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
              />
            </form>
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

export default Driver;
