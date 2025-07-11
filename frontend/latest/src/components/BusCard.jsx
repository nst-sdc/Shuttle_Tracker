import React, { useState, useRef } from 'react';
import socket from '../socket';

const BusCard = ({
  driverName,
  busNo,
  mobileNo,
  location,
  onLocationUpdate,
  isDriver = false,
}) => {
  const busNumber = busNo || 'MH-12-AB-1234';
  const name = driverName || 'Rajesh Kumar';
  const currentLocation = location || 'Your space';
  const phone = mobileNo || '';
  const estimatedArrival = '8 mins';
  const status = '🟢 On Time';
  const direction = 'To College';

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
            socket.emit('send-location', { latitude, longitude });
          }
          console.log('Driver location:', latitude, longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
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
    <div className="backdrop-blur-md bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl max-w-md mx-auto mt-12 p-6 transition-all duration-300 hover:scale-[1.02] font-sans dark:text-white">
      <h2 className="text-center text-3xl font-extrabold text-gray-800 dark:text-white mb-3">
        <span className="inline-block animate-bounce mr-2">🚌</span>Shuttle Info
      </h2>

      <div className="text-center mb-6">
        <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-sm font-semibold px-4 py-1 rounded-full shadow-sm tracking-wide">
          {direction === 'To College' ? '🔼 To College' : '🔽 To Hostel'}
        </span>
      </div>

      <div className="space-y-4">
        <InfoRow icon="🚌" label="Bus Number" value={busNumber} />
        <InfoRow icon="👨‍✈️" label="Driver" value={name} />
        <InfoRow icon="📞" label="Mobile" value={phone} />
        <InfoRow icon="📍" label="Current Location" value={currentLocation} />
        <InfoRow icon="⏰" label="ETA" value={estimatedArrival} />
      </div>

      <div className="mt-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold text-center py-2 rounded-full animate-pulse shadow-inner">
        {status}
      </div>

      {/* Quick Actions Button */}
      <div className="mt-8 flex flex-col items-center">
        <span className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
          Quick Actions
        </span>
        {!routeStarted ? (
          <button
            onClick={handleStartRoute}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-md transition-colors"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <path d="M7 6v12l10-6-10-6z" fill="white" />
            </svg>
            Start Route
          </button>
        ) : (
          <button
            onClick={handleEndRoute}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-md transition-colors"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="white" />
            </svg>
            End Route
          </button>
        )}
        {/* {routeStarted && currentCoords && (
          <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">
            <span className="font-medium">Current Location:</span> <br />
            Lat: {currentCoords.latitude.toFixed(6)}, Lng:{' '}
            {currentCoords.longitude.toFixed(6)}
          </div>
        )} */}
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2">
    <p className="text-blue-700 dark:text-blue-300 font-medium text-[15px] flex items-center gap-1">
      {icon} {label}
    </p>
    <p className="text-gray-800 dark:text-white font-semibold text-[15px]">
      {value}
    </p>
  </div>
);

export default BusCard;
