import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import socket from "../socket";
import { motion } from "framer-motion";

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Helper component to update map center on driver location change
function MapUpdater({ driverLocation }) {
  const map = useMap();
  useEffect(() => {
    if (driverLocation) {
      map.flyTo(
        [driverLocation.latitude, driverLocation.longitude],
        map.getZoom(),
        { animate: true },
      );
    }
  }, [driverLocation, map]);
  return null;
}

function TrackShuttle({ driverLocation }) {
  const [driverLocations, setDriverLocations] = useState([]);

  // Set your default map center (e.g., campus center)
  const mapCenter = [18.617, 73.9114]; // NST Campus approximate
  const zoom = 15;

  // Listen for All Driver Locations
  useEffect(() => {
    // If props passed specific location (for driver view), use that
    if (driverLocation) {
      setDriverLocations([driverLocation]);
      return;
    }

    function handleAllLocations(locations) {
      setDriverLocations(locations);
    }
    socket.on("all-driver-locations", handleAllLocations);
    return () => {
      socket.off("all-driver-locations", handleAllLocations);
    };
  }, [driverLocation]);

  // Driver icon
  const driverIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="w-full flex flex-col h-[calc(100vh-100px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Live Tracking
        </h1>
        <p className="text-muted-foreground">
          Real-time location updates of active shuttles
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 w-full relative rounded-3xl overflow-hidden glass-panel border border-white/20 shadow-2xl"
      >
        <MapContainer
          center={
            driverLocations.length > 0
              ? [driverLocations[0].latitude, driverLocations[0].longitude]
              : mapCenter
          }
          zoom={zoom}
          className="h-full w-full z-0"
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <MapUpdater driverLocation={driverLocations[0]} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {driverLocations.map((driver) => (
            <Marker
              key={driver.id || "driver"}
              position={[driver.latitude, driver.longitude]}
              icon={driverIcon}
            >
              <Popup className="glass-popup">
                <div className="text-center p-2">
                  <span className="font-bold text-lg text-primary block mb-1">
                    Shuttle
                  </span>
                  <span className="block text-xs text-gray-500 mb-1">
                    Lat: {driver.latitude.toFixed(4)} <br /> Lng:{" "}
                    {driver.longitude.toFixed(4)}
                  </span>
                  <span className="text-xs text-gray-400 italic block">
                    Just now
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Overlay status pill */}
        <div className="absolute top-4 right-4 z-[400] bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          {driverLocations.length} Active Shuttles
        </div>
      </motion.div>
    </div>
  );
}

export default TrackShuttle;
