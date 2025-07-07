import React, { useEffect, useState } from 'react';
import BusCard from '../components/BusCard';

function Student() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-4 py-6 sm:p-8 max-w-3xl mx-auto">
      <div className="text-sm sm:text-base text-center font-bold text-gray-600 dark:text-gray-300 mb-4">
        {dateTime.toLocaleString()}
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white text-center mb-4">
        Student Dashboard
      </h1>

      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 text-center mb-8 leading-relaxed">
        Track your shuttle and request pickups here.
      </p>

      <BusCard />
    </div>
  );
}

export default Student;
