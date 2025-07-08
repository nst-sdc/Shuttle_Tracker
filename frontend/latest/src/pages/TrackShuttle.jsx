import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import busPin from '../assets/logo/bus-pin.png';

// Fix for default marker icons in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
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

function TrackShuttle({ driverLocation }) {
  // Example shuttle data - replace with your actual data source
  const [shuttlePositions, setShuttlePositions] = useState([
    {
      id: 1,
      position: [18.623058580402812, 73.91117395579613],
      name: 'Shuttle A',
      status: 'On Time',
      route: 'Campus Loop',
    },
    {
      id: 2,
      position: [18.61194067125513, 73.91169656239255],
      name: 'Shuttle B',
      status: '5 min delay',
      route: 'Downtown Express',
    },
  ]);

  // Example initial map position - set to your campus coordinates
  const mapCenter = [18.617, 73.9114]; // Centered between your shuttle positions
  const zoom = 15;

  // In a real application, you would fetch shuttle positions from your backend
  useEffect(() => {
    // Example function to update shuttle positions
    const fetchShuttlePositions = () => {
      // Replace with actual API call
      // Example: fetch('/api/shuttle-positions').then(res => res.json()).then(data => setShuttlePositions(data));

      // Simulated position update for demonstration
      const simulateMovement = () => {
        setShuttlePositions((prev) =>
          prev.map((shuttle) => ({
            ...shuttle,
            position: [
              shuttle.position[0] + (Math.random() - 0.5) * 0.0005,
              shuttle.position[1] + (Math.random() - 0.5) * 0.0005,
            ],
          }))
        );
      };

      return simulateMovement;
    };

    const updatePositions = fetchShuttlePositions();
    const interval = setInterval(updatePositions, 3000);

    return () => clearInterval(interval);
  }, []);

  // Custom shuttle icons could be added here
  const shuttleIcon = new L.Icon({
    iconUrl: busPin,
    iconSize: [40, 40],
    iconAnchor: [20, 40], // bottom center
    popupAnchor: [0, -40],
  });

  const driverIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1946/1946429.png', // a different icon for driver
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-gradient-to-b from-blue-100 via-blue-200 to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-x-hidden">
      {/* Header with gradient background - compact */}
      <div className="w-full bg-gradient-to-r from-blue-900/95 to-blue-700/90 text-white py-3 px-2 shadow-2xl rounded-b-3xl mb-1 animate-fade-in">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl text-center font-extrabold tracking-tight drop-shadow-lg animate-bounce">
            🚍 Track Shuttle
          </h1>
          <p className="text-base md:text-lg text-center text-blue-100 max-w-2xl mx-auto mt-1 animate-fade-in-slow">
            Real-time tracking of campus shuttles with live updates
          </p>
        </div>
      </div>

      {/* Decorative background pattern */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 1800 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="120" cy="200" r="180" fill="#2563eb" />
          <circle cx="1680" cy="700" r="180" fill="#60a5fa" />
          <circle cx="900" cy="100" r="120" fill="#1e40af" />
          <circle cx="0" cy="800" r="120" fill="#3b82f6" />
          <circle cx="1800" cy="100" r="120" fill="#1e3a8a" />
        </svg>
      </div>

      {/* Map Card - increased height */}
      <div className="flex-1 flex flex-col items-center justify-start px-2 pt-2 pb-0 sm:px-4 md:pt-4 md:pb-0 z-10">
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-2 sm:p-4 md:p-6 flex flex-col h-[60vh] min-h-[340px] md:min-h-[500px] relative animate-float-up">
          <div className="flex-1 w-full h-full rounded-2xl overflow-hidden shadow-xl">
            <MapContainer
              center={
                driverLocation
                  ? [driverLocation.latitude, driverLocation.longitude]
                  : mapCenter
              }
              zoom={zoom}
              className="h-full w-full min-h-[300px] rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow-2xl animate-fade-in"
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <MapUpdater driverLocation={driverLocation} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {shuttlePositions.map((shuttle) => (
                <Marker
                  key={shuttle.id}
                  position={shuttle.position}
                  icon={shuttleIcon}
                >
                  <Popup className="shuttle-popup">
                    <div className="text-center p-1">
                      <span className="font-bold text-lg text-blue-700 block mb-1">
                        {shuttle.name}
                      </span>
                      <span className="block text-sm font-medium">
                        {shuttle.route}
                      </span>
                      <span className="block text-xs text-gray-500 mb-1">
                        Status: {shuttle.status}
                      </span>
                      <span className="text-xs text-gray-600 italic block">
                        Updated: {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Driver marker */}
              {driverLocation && (
                <Marker
                  position={[driverLocation.latitude, driverLocation.longitude]}
                  icon={driverIcon}
                >
                  <Popup>
                    <div className="text-center p-1">
                      <span className="font-bold text-lg text-blue-700 block mb-1">
                        You (Driver)
                      </span>
                      <span className="block text-xs text-gray-500 mb-1">
                        Lat: {driverLocation.latitude.toFixed(6)}, Lng:{' '}
                        {driverLocation.longitude.toFixed(6)}
                      </span>
                      <span className="text-xs text-gray-600 italic block">
                        Updated: {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>

      {/* Info panel - increased height */}
      <div
        className="w-full bg-white dark:bg-gray-900 shadow-2xl z-30 transition-all duration-300 ease-in-out border-t-4 border-blue-500 dark:border-blue-700 h-auto py-6 md:py-10 max-w-7xl mx-auto rounded-b-3xl"
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-100 dark:border-blue-800">
          <h2 className="text-2xl font-extrabold text-blue-800 dark:text-blue-200 tracking-wide flex items-center gap-2">
            <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full p-2 shadow-md">
              <svg width='24' height='24' fill='none' viewBox='0 0 24 24'><path d='M3 13V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v6M3 13v4a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-4M3 13h18' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>
            </span>
            Shuttle Information
          </h2>
        </div>

        <div className="p-4 overflow-y-auto max-h-[22rem] md:max-h-[28rem] flex flex-col md:flex-row gap-6">
          {/* Active Shuttles Card */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 p-4 flex flex-col gap-2 hover:scale-[1.02] transition-transform min-h-[200px]">
            <h3 className="font-bold mb-2 text-blue-700 dark:text-blue-200 text-lg flex items-center gap-2">
              <span className="inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full p-1">
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24'><circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2'/><circle cx='12' cy='12' r='5' fill='currentColor'/></svg>
              </span>
              Active Shuttles
            </h3>
            <ul className="space-y-3">
              {shuttlePositions.map((shuttle) => (
                <li
                  key={shuttle.id}
                  className="flex items-center bg-blue-50 dark:bg-blue-950/70 p-3 rounded-xl shadow border border-blue-100 dark:border-blue-900 gap-3 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors group"
                >
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2 animate-pulse shadow-md border-2 border-white group-hover:scale-110 transition-transform"></div>
                  <div className="flex-1">
                    <span className="font-semibold block text-base text-blue-900 dark:text-blue-100">
                      {shuttle.name}
                    </span>
                    <span className="text-xs text-blue-700 dark:text-blue-300 block">
                      {shuttle.route}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 shadow">
                    {shuttle.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule Card */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-blue-200 dark:border-blue-800 p-4 flex flex-col gap-2 hover:scale-[1.02] transition-transform min-h-[200px]">
            <h3 className="font-bold mb-2 text-blue-700 dark:text-blue-200 text-lg flex items-center gap-2">
              <span className="inline-block bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-full p-1">
                <svg width='20' height='20' fill='none' viewBox='0 0 24 24'><rect x='4' y='4' width='16' height='16' rx='4' stroke='currentColor' strokeWidth='2'/><path d='M8 10h8M8 14h5' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/></svg>
              </span>
              Schedule
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                  <svg width='16' height='16' fill='none' viewBox='0 0 24 24'><path d='M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>
                </span>
                <span className="font-semibold">Weekdays:</span> 7:00 AM - 10:00 PM
              </div>
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                  <svg width='16' height='16' fill='none' viewBox='0 0 24 24'><path d='M8 7V3M16 7V3M3 11h18M5 19h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>
                </span>
                <span className="font-semibold">Weekends:</span> 9:00 AM - 8:00 PM
              </div>
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
                <span className="inline-block bg-blue-100 dark:bg-blue-900 rounded-full p-1">
                  <svg width='16' height='16' fill='none' viewBox='0 0 24 24'><path d='M12 8v4l3 3' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/></svg>
                </span>
                <span className="font-semibold">Frequency:</span> Every 15 minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(40px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-float-up { animation: floatUp 1.2s cubic-bezier(.22,1,.36,1) 0.1s both; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 1.2s cubic-bezier(.22,1,.36,1) 0.2s both; }
        .animate-fade-in-slow { animation: fadeIn 2.2s cubic-bezier(.22,1,.36,1) 0.5s both; }
      `}</style>
    </div>
  );
}

export default TrackShuttle;
