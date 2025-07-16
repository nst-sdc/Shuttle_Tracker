import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import socket from '../socket';

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

function TrackShuttle() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [driverLocations, setDriverLocations] = useState([]);

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

  // Listen for All Driver Locations
  useEffect(() => {
    function handleAllLocations(locations) {
      setDriverLocations(locations);
    }
    socket.on('all-driver-locations', handleAllLocations);
    return () => {
      socket.off('all-driver-locations', handleAllLocations);
    };
  }, []);

  // Log updated driver locations every time they change
  useEffect(() => {
    console.log('All driver locations:', driverLocations);
  }, [driverLocations]);

  // Custom shuttle icons could be added here
  const shuttleIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const driverIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // a different icon for driver
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

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
        <div
          className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex-1 flex flex-col min-h-0"
        >
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
                      Lat: {driver.latitude.toFixed(6)}, Lng:{' '}
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

      {/* Info panel - now positioned at the bottom with fixed height */}
      <div
        className={`w-full bg-white dark:bg-gray-800 shadow-xl z-10 transition-all duration-300 ease-in-out ${
          isPanelOpen ? 'h-40' : 'h-12'
        } overflow-hidden fixed bottom-0 left-0 border-t border-gray-200 dark:border-gray-700`}
      >
        <div className="flex justify-between items-center p-2 border-b dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Shuttle Information
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            onClick={togglePanel}
          >
            {isPanelOpen ? '▼' : '▲'}
          </button>
        </div>

        <div className="p-3 overflow-y-auto max-h-[8rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">
                Active Shuttles
              </h3>
              <ul className="space-y-1">
                {shuttlePositions.map((shuttle) => (
                  <li
                    key={shuttle.id}
                    className="flex items-center bg-gray-50 dark:bg-gray-700 p-1.5 rounded"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></div>
                    <div>
                      <span className="font-medium block text-sm">
                        {shuttle.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {shuttle.route}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-gray-700 dark:text-gray-200">
                Schedule
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded text-xs">
                <p className="mb-1">
                  <span className="font-medium">Weekdays:</span> 7:00 AM - 10:00
                  PM
                </p>
                <p className="mb-1">
                  <span className="font-medium">Weekends:</span> 9:00 AM - 8:00
                  PM
                </p>
                <p>
                  <span className="font-medium">Frequency:</span> Every 15
                  minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackShuttle;
