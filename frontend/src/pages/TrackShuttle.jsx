import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import socket from "../socket";

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
        { animate: true }
      );
    }
  }, [driverLocation, map]);
  return null;
}

function TrackShuttle() {
  const [driverLocations, setDriverLocations] = useState([]);

  // Set your default map center (e.g., campus center)
  const mapCenter = [18.617, 73.9114];
  const zoom = 15;

  // Listen for All Driver Locations
  useEffect(() => {
    function handleAllLocations(locations) {
      setDriverLocations(locations);
    }
    socket.on("all-driver-locations", handleAllLocations);
    return () => {
      socket.off("all-driver-locations", handleAllLocations);
    };
  }, []);

  // Log updated driver locations every time they change
  useEffect(() => {
    console.log("All driver locations:", driverLocations);
  }, [driverLocations]);

  // Driver icon
  const driverIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  return (
    <div className="min-h-screen w-full flex flex-col relative bg-gray-100 dark:bg-gray-900">
      {/* Header with gradient background - smaller height */}
      <div className="w-full bg-gradient-to-r from-blue-900/90 to-blue-700/90 text-white p-3 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl text-center font-bold tracking-tight">
            Track Shuttle
          </h1>
          <p className="text-sm md:text-base text-center text-blue-100 max-w-2xl mx-auto">
            Real-time tracking of campus shuttles with live updates
          </p>
        </div>
      </div>

      {/* Responsive Map Card Container */}
      <div className="flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8 min-h-0">
        <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 flex flex-col min-h-0">
          <MapContainer
            center={
              driverLocations.length > 0
                ? [driverLocations[0].latitude, driverLocations[0].longitude]
                : mapCenter
            }
            zoom={zoom}
            className="h-full w-full z-0 flex-1"
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <MapUpdater driverLocation={driverLocations[0]} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Real driver marker(s) only */}
            {driverLocations.map((driver) => (
              <Marker
                key={driver.id}
                position={[driver.latitude, driver.longitude]}
                icon={driverIcon}
              >
                <Popup>
                  <div className="text-center p-1">
                    <span className="font-bold text-lg text-blue-700 block mb-1">
                      Driver
                    </span>
                    <span className="block text-xs text-gray-500 mb-1">
                      Lat: {driver.latitude.toFixed(6)}, Lng:{" "}
                      {driver.longitude.toFixed(6)}
                    </span>
                    <span className="text-xs text-gray-600 italic block">
                      Updated: {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default TrackShuttle;
