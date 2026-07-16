import type { SensorData } from '../types';

export const calculateStatistics = (data: SensorData[], parameter: keyof Pick<SensorData, 'temperature' | 'humidity' | 'rainfall'>) => {
  if (data.length === 0) {
    return { min: 0, max: 0, average: 0, current: 0, trend: 'stable' as const };
  }

  const values = data.map((d) => d[parameter] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = values.reduce((a, b) => a + b, 0) / values.length;
  const current = values[values.length - 1];

  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (values.length >= 2) {
    const lastFive = values.slice(-5);
    const avgLastFive = lastFive.reduce((a, b) => a + b, 0) / lastFive.length;
    const prevFive = values.slice(-10, -5);
    if (prevFive.length > 0) {
      const avgPrevFive = prevFive.reduce((a, b) => a + b, 0) / prevFive.length;
      if (avgLastFive > avgPrevFive * 1.05) {
        trend = 'up';
      } else if (avgLastFive < avgPrevFive * 0.95) {
        trend = 'down';
      }
    }
  }

  return {
    min: Number(min.toFixed(1)),
    max: Number(max.toFixed(1)),
    average: Number(average.toFixed(1)),
    current: Number(current.toFixed(1)),
    trend,
  };
};

export const calculateStandardDeviation = (data: number[]): number => {
  if (data.length === 0) return 0;
  
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const squareDiffs = data.map((v) => Math.pow(v - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / data.length;
  return Math.sqrt(avgSquareDiff);
};

export const formatNumber = (num: number, decimals: number = 1): string => {
  return num.toFixed(decimals);
};

export const getStatusColor = (value: number, min: number, max: number): string => {
  if (value < min * 1.1 || value > max * 0.9) {
    return 'text-red-500';
  }
  if (value < min * 1.2 || value > max * 0.8) {
    return 'text-yellow-500';
  }
  return 'text-green-500';
};

export const getParameterUnit = (parameter: string): string => {
  switch (parameter) {
    case 'temperature':
      return '°C';
    case 'humidity':
      return '%';
    case 'rainfall':
      return 'mm';
    default:
      return '';
  }
};

export const getParameterLabel = (parameter: string): string => {
  switch (parameter) {
    case 'temperature':
      return 'อุณหภูมิ';
    case 'humidity':
      return 'ความชื้น';
    case 'rainfall':
      return 'ปริมาณน้ำฝน';
    default:
      return parameter;
  }
};
