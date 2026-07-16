import { formatNumber, getStatusColor, getParameterLabel } from '../utils/calculationUtils';

interface SensorCardProps {
  title: string;
  value: number;
  parameter: string;
  icon: React.ReactNode;
  min?: number;
  max?: number;
  trend?: 'up' | 'down' | 'stable';
}

const SensorCard: React.FC<SensorCardProps> = ({
  value,
  parameter,
  icon,
  min = 0,
  max = 100,
  trend = 'stable',
}) => {
  const statusColor = getStatusColor(value, min, max);
  const label = getParameterLabel(parameter);

  const trendIcon = () => {
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

  const getUnit = (param: string): string => {
    switch (param) {
      case 'temperature': return '°C';
      case 'humidity': return '%';
      case 'rainfall': return 'mm';
      default: return '';
    }
  };

  return (
    <div className="card card-hover bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-3xl font-bold ${statusColor}`}>
              {formatNumber(value)}
            </span>
            <span className="text-lg text-gray-500 dark:text-gray-400">{getUnit(parameter)}</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {trendIcon()}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {trend === 'up' ? 'เพิ่มขึ้น' : trend === 'down' ? 'ลดลง' : 'คงที่'}
            </span>
          </div>
        </div>
        <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
          {icon}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">ต่ำสุด</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{formatNumber(min)} {getUnit(parameter)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500 dark:text-gray-400">สูงสุด</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{formatNumber(max)} {getUnit(parameter)}</span>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
