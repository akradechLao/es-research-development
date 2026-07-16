import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import { stations } from '../data/stations';
import { generateMockData } from '../data/mockData';
import { format } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = '24h' | '7d' | '30d';
type Parameter = 'temperature' | 'humidity' | 'rainfall';

const StationComparisonChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [parameter, setParameter] = useState<Parameter>('temperature');

  const getHoursFromRange = (range: TimeRange): number => {
    switch (range) {
      case '24h': return 24;
      case '7d': return 7 * 24;
      case '30d': return 30 * 24;
    }
  };

  const getDataForTimeRange = (range: TimeRange) => {
    const hours = getHoursFromRange(range);
    
    return stations.map((station) => {
      const data = generateMockData(station.id, hours);
      return {
        station,
        data,
      };
    });
  };

  const stationData = getDataForTimeRange(timeRange);

  const getParameterConfig = (param: Parameter) => {
    switch (param) {
      case 'temperature':
        return {
          label: 'อุณหภูมิ (°C)',
          colors: [
            { border: 'rgb(239, 68, 68)', bg: 'rgba(239, 68, 68, 0.1)' },
            { border: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)' },
          ],
          yCallback: (value: any) => `${value}°C`,
        };
      case 'humidity':
        return {
          label: 'ความชื้น (%)',
          colors: [
            { border: 'rgb(59, 130, 246)', bg: 'rgba(59, 130, 246, 0.1)' },
            { border: 'rgb(168, 85, 247)', bg: 'rgba(168, 85, 247, 0.1)' },
          ],
          yCallback: (value: any) => `${value}%`,
        };
      case 'rainfall':
        return {
          label: 'ปริมาณน้ำฝน (mm)',
          colors: [
            { border: 'rgb(34, 197, 94)', bg: 'rgba(34, 197, 94, 0.1)' },
            { border: 'rgb(234, 179, 8)', bg: 'rgba(234, 179, 8, 0.1)' },
          ],
          yCallback: (value: any) => `${value} mm`,
        };
    }
  };

  const paramConfig = getParameterConfig(parameter);

  const chartData = {
    labels: stationData[0]?.data.map((d) => {
      if (timeRange === '24h') {
        return format(new Date(d.timestamp), 'HH:mm');
      } else if (timeRange === '7d') {
        return format(new Date(d.timestamp), 'dd/MM HH:mm');
      } else {
        return format(new Date(d.timestamp), 'dd/MM');
      }
    }) || [],
    datasets: stationData.map((sd, index) => ({
      label: sd.station.name,
      data: sd.data.map((d) => d[parameter]),
      borderColor: paramConfig.colors[index % paramConfig.colors.length].border,
      backgroundColor: paramConfig.colors[index % paramConfig.colors.length].bg,
      fill: true,
      tension: 0.4,
      pointRadius: timeRange === '30d' ? 0 : 2,
      pointHoverRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        padding: 12,
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: timeRange === '24h' ? 12 : timeRange === '7d' ? 14 : 15,
          font: { size: 11 },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: { size: 11 },
          callback: paramConfig.yCallback,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          เปรียบเทียบข้อมูลย้อนหลังระหว่างสถานี
        </h3>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {(['24h', '7d', '30d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  timeRange === range
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {range === '24h' ? '24 ชม.' : range === '7d' ? '7 วัน' : '30 วัน'}
              </button>
            ))}
          </div>
          
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {([
              { value: 'temperature', label: 'อุณหภูมิ' },
              { value: 'humidity', label: 'ความชื้น' },
              { value: 'rainfall', label: 'น้ำฝน' },
            ] as { value: Parameter; label: string }[]).map((p) => (
              <button
                key={p.value}
                onClick={() => setParameter(p.value)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                  parameter === p.value
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          {stations.map((station, index) => (
            <div key={station.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: paramConfig.colors[index % paramConfig.colors.length].border }}
              ></div>
              <span>{station.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationComparisonChart;
