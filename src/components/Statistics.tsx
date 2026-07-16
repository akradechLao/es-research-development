import type { SensorData } from '../types';
import { calculateStatistics, getParameterLabel, getParameterUnit } from '../utils/calculationUtils';

interface StatisticsProps {
  data: SensorData[];
}

const Statistics: React.FC<StatisticsProps> = ({ data }) => {
  const parameters = ['temperature', 'humidity', 'rainfall'] as const;
  
  const stats = parameters.map((param) => ({
    parameter: param,
    ...calculateStatistics(data, param),
  }));

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        );
    }
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        สถิติข้อมูล
      </h3>
      
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.parameter}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {getParameterLabel(stat.parameter)}
              </span>
              <div className="flex items-center gap-1">
                {getTrendIcon(stat.trend)}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.trend === 'up' ? 'เพิ่มขึ้น' : stat.trend === 'down' ? 'ลดลง' : 'คงที่'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">ปัจจุบัน</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {stat.current} {getParameterUnit(stat.parameter)}
                </p>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">เฉลี่ย</p>
                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {stat.average} {getParameterUnit(stat.parameter)}
                </p>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">ต่ำสุด</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {stat.min} {getParameterUnit(stat.parameter)}
                </p>
              </div>
              <div className="text-center p-2 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400">สูงสุด</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  {stat.max} {getParameterUnit(stat.parameter)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
