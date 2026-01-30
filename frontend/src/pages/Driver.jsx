import React, { useEffect, useState } from "react";
import BusCard from "../components/BusCard";
import toast, { Toaster } from "react-hot-toast";
import TrackShuttle from "./TrackShuttle";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Bus, Phone, MapPin } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function Driver({ setUserType }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
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
    const fetchUserData = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUserData(data.user);
          if (!data.user.busNumber) {
            setShowOnboarding(true);
            setDriverName(data.user.name || "");
          } else {
            setDriverName(data.user.driverName || data.user.name);
            setBusNo(data.user.busNumber);
            setMobileNo(data.user.mobileNumber);
            setLocation(data.user.currentLocation || "Campus");
          }
        } else {
          // If token is invalid, log out
          handleLogout();
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!driverName || !busNo || !mobileNo || !location) {
      toast.error("Please fill all details");
      return;
    }

    const token = localStorage.getItem("jwt_token");
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          driverName,
          busNumber: busNo,
          mobileNumber: mobileNo,
          currentLocation: location,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setUserData(data.user);
        setShowOnboarding(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("driver_user");
    if (setUserType) setUserType(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <AnimatePresence mode="wait">
        {showOnboarding ? (
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
                  Complete your profile to start managing trips
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
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all text-lg mt-4"
                >
                  Complete Profile
                </motion.button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col h-full mt-6"
          >
            <div className="flex justify-between items-center mb-8 glass-panel p-6 rounded-2xl border border-white/10 shadow-xl">
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Driver Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  {dateTime.toLocaleDateString()} |{" "}
                  {dateTime.toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block text-right">
                  <p className="font-semibold">{userData?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {userData?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all font-medium border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
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
                <div className="glass-panel p-4 rounded-3xl border border-white/10 shadow-2xl overflow-hidden h-[500px]">
                  <TrackShuttle driverLocation={driverLocation} />
                </div>
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
