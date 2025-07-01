import React from 'react';

const BusCard = () => {
  const dummyBus = {
    busNumber: 'MH-12-AB-1234',
    driverName: 'Rajesh Kumar',
    currentLocation: 'Your space',
    estimatedArrival: '8 mins',
    status: '🟢 On Time',
    direction: 'To College',
  };

  return (
    <div className="backdrop-blur-md bg-white/80 dark:bg-white/10 border border-gray-200 dark:border-gray-700 shadow-xl rounded-3xl max-w-md mx-auto mt-12 p-6 transition-all duration-300 hover:scale-[1.02] font-sans dark:text-white">
      <h2 className="text-center text-3xl font-extrabold text-gray-800 dark:text-white mb-3">
        <span className="inline-block animate-bounce mr-2">🚌</span>Shuttle Info
      </h2>

      <div className="text-center mb-6">
        <span className="inline-block bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-sm font-semibold px-4 py-1 rounded-full shadow-sm tracking-wide">
          {dummyBus.direction === 'To College' ? '🔼 To College' : '🔽 To Hostel'}
        </span>
      </div>

      <div className="space-y-4">
        <InfoRow icon="🚌" label="Bus Number" value={dummyBus.busNumber} />
        <InfoRow icon="👨‍✈️" label="Driver" value={dummyBus.driverName} />
        <InfoRow icon="📍" label="Current Location" value={dummyBus.currentLocation} />
        <InfoRow icon="⏰" label="ETA" value={dummyBus.estimatedArrival} />
      </div>

      <div className="mt-6 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold text-center py-2 rounded-full animate-pulse shadow-inner">
        {dummyBus.status}
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
