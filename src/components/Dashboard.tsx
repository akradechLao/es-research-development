import React from 'react';
import { useApp } from '../context/AppContext';
import { useRealTimeData } from '../hooks/useRealTimeData';
import StationSelector from './StationSelector';
import SensorCard from './SensorCard';
import RealTimeDisplay from './RealTimeDisplay';
import HistoricalData from './HistoricalData';
import Statistics from './Statistics';
import ThresholdSettings from './ThresholdSettings';
import AlertSettings from './AlertSettings';
import ExportData from './ExportData';
import ComparisonView from './ComparisonView';
import StationComparisonChart from './StationComparisonChart';
import StationMap from './StationMap';
import StationGallery from './StationGallery';

const Dashboard: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    selectedStation,
    timeRange,
    setTimeRange,
    showComparison,
    setShowComparison,
  } = useApp();

  const { data, currentData, loading } = useRealTimeData(selectedStation);

  const sensorCards = currentData
    ? [
        {
          title: 'อุณหภูมิ',
          value: currentData.temperature,
          parameter: 'temperature',
          min: 15,
          max: 40,
          icon: (
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          ),
        },
        {
          title: 'ความชื้น',
          value: currentData.humidity,
          parameter: 'humidity',
          min: 30,
          max: 90,
          icon: (
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          ),
        },
        {
          title: 'ปริมาณน้ำฝน',
          value: currentData.rainfall,
          parameter: 'rainfall',
          min: 0,
          max: 50,
          icon: (
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          ),
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              ES Research Weather Dashboard
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              ระบบตรวจวัดค่าน้ำฝน อุณหภูมิ และความชื้น
            </p>
          </div>

          <div className="flex items-center gap-4">
            <StationSelector />

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Real-time Display */}
        <div className="mb-8">
          <RealTimeDisplay currentData={currentData} lastUpdate={new Date()} />
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sensorCards.map((card) => (
            <SensorCard
              key={card.parameter}
              title={card.title}
              value={card.value}
              parameter={card.parameter}
              icon={card.icon}
              min={card.min}
              max={card.max}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <ExportData data={data} />

          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              showComparison
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            เปรียบเทียบข้อมูล
          </button>
        </div>

        {/* Comparison View */}
        {showComparison && (
          <div className="mb-8">
            <ComparisonView data={data} />
          </div>
        )}

        {/* Historical Data */}
        <div className="mb-8">
          <HistoricalData
            data={data}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        </div>

        {/* Station Comparison Chart */}
        <div className="mb-8">
          <StationComparisonChart />
        </div>

        {/* Station Map and Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <StationMap />
          <StationGallery />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Statistics data={data} />
          <ThresholdSettings />
          <AlertSettings />
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ES Research Development - Weather Monitoring Dashboard
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            อัพเดทข้อมูลทุก 30 วินาที | ข้อมูลจำลองสำหรับตัวอย่าง
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
