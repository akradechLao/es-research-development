import type { SensorData } from '../types';
import { format } from 'date-fns';

interface RealTimeDisplayProps {
  currentData: SensorData | null;
  lastUpdate: Date;
}

const RealTimeDisplay: React.FC<RealTimeDisplayProps> = ({ currentData, lastUpdate }) => {
  if (!currentData) {
    return (
      <div className="card animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span className="text-sm text-gray-500">กำลังโหลดข้อมูล...</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const parameters = [
    {
      name: 'อุณหภูมิ',
      value: currentData.temperature,
      unit: '°C',
      color: 'text-red-500',
      bg: 'bg-red-100 dark:bg-red-900',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      name: 'ความชื้น',
      value: currentData.humidity,
      unit: '%',
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
    },
    {
      name: 'น้ำฝน',
      value: currentData.rainfall,
      unit: 'mm',
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-900',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="card bg-gradient-to-br from-primary-50 to-white dark:from-primary-900/20 dark:to-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            ข้อมูลแบบเรียลไทม์
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          อัพเดทล่าสุด: {format(lastUpdate, 'HH:mm:ss')}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {parameters.map((param) => (
          <div
            key={param.name}
            className={`p-4 rounded-xl ${param.bg} transition-all duration-300 hover:scale-105`}
          >
            <div className={`flex items-center justify-between mb-2`}>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {param.name}
              </span>
              <span className={param.color}>{param.icon}</span>
            </div>
            <div className={`text-2xl font-bold ${param.color}`}>
              {param.value.toFixed(1)}
              <span className="text-sm font-normal ml-1">{param.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeDisplay;
