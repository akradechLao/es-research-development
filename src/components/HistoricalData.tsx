import type { SensorData, TimeRange } from '../types';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import RainfallChart from './RainfallChart';

interface HistoricalDataProps {
  data: SensorData[];
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

const HistoricalData: React.FC<HistoricalDataProps> = ({
  data,
  timeRange,
  onTimeRangeChange,
}) => {
  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '24h', label: '24 ชั่วโมง' },
    { value: '7d', label: '7 วัน' },
    { value: '30d', label: '30 วัน' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          ข้อมูลย้อนหลัง
        </h3>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onTimeRangeChange(range.value)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                timeRange === range.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TemperatureChart data={data} />
        <HumidityChart data={data} />
        <RainfallChart data={data} />
      </div>
    </div>
  );
};

export default HistoricalData;
