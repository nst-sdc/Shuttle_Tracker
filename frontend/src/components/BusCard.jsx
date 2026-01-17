import React, { useState, useRef } from "react";
import socket from "../socket";
import {
  Bus,
  User,
  Phone,
  MapPin,
  Clock,
  Play,
  Square,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

const BusCard = ({
  driverName,
  busNo,
  mobileNo,
  location,
  onLocationUpdate,
  isDriver = false,
  onLogout,
}) => {
  // dummy data
  const busNumber = busNo || "MH-12-AB-1234";
  const name = driverName || "Rajesh Kumar";
  const currentLocation = location || "Your space";
  const phone = mobileNo || "1234567890";
  const estimatedArrival = "8 mins";
  const status = "🟢 On Time";
  const direction = "To College";

  const [routeStarted, setRouteStarted] = useState(false);
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
          console.log("Driver location:", latitude, longitude);
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
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-panel rounded-3xl max-w-md mx-auto mt-6 p-8 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3 mb-2">
          <Bus className="w-8 h-8 text-primary" />
          <span>Shuttle Info</span>
        </h2>
        <span className="inline-block bg-primary/10 text-primary border border-primary/20 text-sm font-semibold px-4 py-1 rounded-full">
          {direction === "To College" ? "🔼 To College" : "🔽 To Hostel"}
        </span>
      </div>

      <div className="space-y-4">
        <InfoRow icon={Bus} label="Bus Number" value={busNumber} />
        <InfoRow icon={User} label="Driver" value={name} />
        <InfoRow icon={Phone} label="Mobile" value={phone} />
        <InfoRow icon={MapPin} label="Location" value={currentLocation} />
        <InfoRow icon={Clock} label="ETA" value={estimatedArrival} />
      </div>

      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="flex flex-col items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Controls
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            {!routeStarted ? (
              <button
                onClick={handleStartRoute}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-green-500/20 active:scale-95 w-full"
              >
                <Play className="fill-current w-5 h-5" />
                Start Route
              </button>
            ) : (
              <button
                onClick={handleEndRoute}
                className="flex-1 flex items-center justify-center gap-2 bg-destructive hover:bg-destructive/90 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-destructive/20 active:scale-95 w-full"
              >
                <Square className="fill-current w-5 h-5" />
                End Route
              </button>
            )}

            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20 font-bold py-3 px-6 rounded-xl transition-all w-full sm:w-auto"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition-colors">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <span className="text-muted-foreground font-medium text-sm">{label}</span>
    </div>
    <span className="font-semibold text-foreground text-base">{value}</span>
  </div>
);

export default BusCard;
