import { useState } from 'react';
import { getStationById } from '../data/stations';
import { useApp } from '../context/AppContext';
import { useRealTimeData } from '../hooks/useRealTimeData';
import { format } from 'date-fns';

const StationGallery: React.FC = () => {
  const { selectedStation } = useApp();
  const { currentData } = useRealTimeData(selectedStation);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'cameras'>('info');
  
  const station = getStationById(selectedStation);
  
  if (!station) {
    return (
      <div className="card">
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          ไม่พบข้อมูลสถานี
        </p>
      </div>
    );
  }

  const sensorReadings = currentData ? [
    {
      label: 'อุณหภูมิ',
      value: currentData.temperature,
      unit: '°C',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'text-red-500',
      bg: 'bg-red-100 dark:bg-red-900/30',
    },
    {
      label: 'ความชื้น',
      value: currentData.humidity,
      unit: '%',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      label: 'น้ำฝน',
      value: currentData.rainfall,
      unit: 'mm',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
  ] : [];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {station.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${station.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {station.isActive ? 'ออนไลน์' : 'ออฟไลน์'}
          </span>
        </div>
      </div>

      {/* Current Sensor Readings */}
      {currentData && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {sensorReadings.map((sensor) => (
            <div
              key={sensor.label}
              className={`p-3 rounded-xl ${sensor.bg} transition-all hover:scale-105`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={sensor.color}>{sensor.icon}</span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {sensor.label}
                </span>
              </div>
              <div className={`text-xl font-bold ${sensor.color}`}>
                {sensor.value.toFixed(1)}
                <span className="text-xs font-normal ml-1">{sensor.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Station Info */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">{station.location}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              พิกัด: {station.latitude}, {station.longitude}
            </p>
          </div>
        </div>
      </div>

      {station.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {station.description}
        </p>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('photos')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'photos'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          รูปถ่ายสถานี
        </button>
        <button
          onClick={() => setActiveTab('cameras')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'cameras'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          กล้องวงจรปิด
        </button>
      </div>

      {/* Photos Tab */}
      {activeTab === 'photos' && (
        <div className="space-y-4">
          {station.images && station.images.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {station.images.map((image, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${station.name} - รูปที่ ${index + 1}`}
                    className="w-full h-auto max-h-64 object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>ยังไม่มีรูปถ่ายสถานี</p>
            </div>
          )}
        </div>
      )}

      {/* Cameras Tab */}
      {activeTab === 'cameras' && (
        <div className="space-y-4">
          {station.cameras && station.cameras.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {station.cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    <img
                      src={camera.url}
                      alt={camera.name}
                      className="w-full h-auto max-h-64 object-contain"
                    />
                    {camera.isOnline && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        LIVE
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200">{camera.name}</h5>
                    {camera.lastCapture && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        อัพเดทล่าสุด: {format(new Date(camera.lastCapture), 'HH:mm:ss')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>ยังไม่มีกล้องวงจรปิด</p>
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <img
              src={selectedImage}
              alt="Station"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationGallery;
