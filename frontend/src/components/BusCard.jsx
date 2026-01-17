import React, { useState, useRef } from "react";
import socket from "../socket";
import {
  Bus,
  User,
  Phone,
  Play,
  Square,
  Navigation,
  Activity,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BusCard = ({
  driverName,
  busNo,
  mobileNo,
  onLocationUpdate,
  isDriver = false,
  onLogout,
}) => {
  // dummy data
  const busNumber = busNo || "MH-12-AB-1234";
  const name = driverName || "Rajesh Kumar";
  const phone = mobileNo || "1234567890";
  const direction = "To College";

  const [routeStarted, setRouteStarted] = useState(false);
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const watchIdRef = useRef(null);

  const handleStartRoute = () => {
    setRouteStarted(true);
    if (navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (onLocationUpdate) onLocationUpdate({ latitude, longitude });
          if (isDriver) {
            socket.emit("send-location", { latitude, longitude });
          }
        },
        (err) => {
          console.error("Geolocation error:", err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 },
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleEndRoute = () => {
    setRouteStarted(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (onLocationUpdate) onLocationUpdate(null);
  };

  return (
    <div className="flex items-start justify-center gap-4 transition-all w-full max-w-5xl mx-auto p-4">
      {/* Shuttle Info Card */}
      <motion.div layout className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur opacity-25" />
        <div className="relative glass-panel rounded-[2rem] p-8 overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
          {/* Status & Direction Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border bg-blue-500/10 text-blue-500 border-blue-500/20">
              <Navigation className="w-3 h-3" />
              <span>{direction}</span>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${routeStarted ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"}`}
            >
              <span
                className={`w-2 h-2 rounded-full ${routeStarted ? "bg-green-500" : "bg-yellow-500"} animate-pulse`}
              />
              {routeStarted ? "LIVE" : "IDLE"}
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 mb-4 transform rotate-3">
              <Bus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shuttle Info
            </h2>
            <p className="text-sm text-gray-500 mt-1">Bus details & Controls</p>
          </div>

          <div className="space-y-3 mb-8">
            <InfoCard
              icon={ShieldCheck}
              label="Bus Number"
              value={busNumber}
              color="text-amber-500"
            />

            {/* Toggle Driver Info Button */}
            <button
              onClick={() => setShowDriverInfo(!showDriverInfo)}
              className="w-full flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm text-blue-500">
                  <User className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Driver Details
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-medium">
                {showDriverInfo ? "Hide" : "View"}
                {showDriverInfo ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>
          </div>

          {/* Controls */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
            {!routeStarted ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartRoute}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-xl shadow-blue-500/20 transition-all"
              >
                <Play className="fill-current w-5 h-5" />
                Start Journey
              </motion.button>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEndRoute}
                  className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <Square className="fill-current w-5 h-5" />
                  End
                </motion.button>

                <motion.div
                  layout
                  className="flex items-center justify-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20"
                >
                  <Activity className="w-5 h-5 text-blue-500 mr-2 animate-pulse" />
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    In Progress
                  </span>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Driver Info Card (Expandable) */}
      <AnimatePresence mode="popLayout">
        {showDriverInfo && (
          <motion.div
            layout
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            className="relative w-full max-w-xs hidden md:block" // Hidden on mobile initially for simplicity, or change to flex-col on mobile
          >
            <div className="relative glass-panel rounded-[2rem] p-8 overflow-hidden border border-white/20 dark:border-white/10 shadow-xl h-full flex flex-col justify-center">
              <div className="text-center">
                <div className="inline-block p-1 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 mb-4">
                  <div className="p-1 rounded-full bg-white dark:bg-gray-900">
                    <User className="w-16 h-16 text-gray-400 p-2" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {name}
                </h3>
                <p className="text-sm text-gray-500">Official Driver</p>
              </div>

              <div className="mt-8 space-y-4">
                <InfoCard
                  icon={Phone}
                  label="Mobile"
                  value={phone}
                  color="text-green-500"
                />
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    License
                  </span>
                  <span className="font-bold text-sm">Valid</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all group">
    <div className="flex items-center gap-3">
      <div
        className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {label}
      </span>
    </div>
    <span className="font-bold text-gray-900 dark:text-gray-100">{value}</span>
  </div>
);

export default BusCard;
