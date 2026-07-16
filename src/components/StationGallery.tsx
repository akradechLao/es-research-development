import { useState } from 'react';
import { getStationById } from '../data/stations';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const StationGallery: React.FC = () => {
  const { selectedStation } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'photos' | 'cameras'>('photos');
  
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

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          รูปถ่ายสถานี / กล้องวงจรปิด
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {station.name}
        </span>
      </div>

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
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            รูปถ่ายสถานี
          </div>
        </button>
        <button
          onClick={() => setActiveTab('cameras')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'cameras'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            กล้องวงจรปิด
          </div>
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
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">{station.name}</p>
                    <p className="text-white/80 text-xs">{station.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>ยังไม่มีรูปถ่ายสถานี</p>
            </div>
          )}
          
          {/* Station Description */}
          {station.description && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">รายละเอียดสถานี</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{station.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Cameras Tab */}
      {activeTab === 'cameras' && (
        <div className="space-y-4">
          {station.cameras && station.cameras.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {station.cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className="relative">
                    <img
                      src={camera.url}
                      alt={camera.name}
                      className="w-full h-48 object-cover"
                    />
                    {/* Live indicator */}
                    {camera.isOnline && (
                      <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        LIVE
                      </div>
                    )}
                    {/* Status badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs ${
                      camera.isOnline
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}>
                      {camera.isOnline ? 'ออนไลน์' : 'ออฟไลน์'}
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-800 dark:text-gray-200">{camera.name}</h5>
                        {camera.lastCapture && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ถ่ายล่าสุด: {format(new Date(camera.lastCapture), 'dd/MM/yyyy HH:mm')}
                          </p>
                        )}
                      </div>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
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
