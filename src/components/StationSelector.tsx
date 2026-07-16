import React from 'react';
import { useApp } from '../context/AppContext';
import { stations } from '../data/stations';

const StationSelector: React.FC = () => {
  const { selectedStation, setSelectedStation } = useApp();

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        สถานี:
      </label>
      <select
        value={selectedStation}
        onChange={(e) => setSelectedStation(e.target.value)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
      >
        {stations.map((station) => (
          <option key={station.id} value={station.id}>
            {station.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StationSelector;
