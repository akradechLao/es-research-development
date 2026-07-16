import type { SensorData, Threshold, Alert } from '../types';

const generateRandomValue = (min: number, max: number): number => {
  return Number((Math.random() * (max - min) + min).toFixed(1));
};

const generateTimestamp = (hoursAgo: number): Date => {
  const now = new Date();
  now.setHours(now.getHours() - hoursAgo);
  return now;
};

export const generateMockData = (stationId: string, hours: number = 24): SensorData[] => {
  const data: SensorData[] = [];
  
  for (let i = hours; i >= 0; i--) {
    const hourOfDay = (new Date().getHours() - i + 24) % 24;
    
    let tempBase = 28;
    if (hourOfDay >= 6 && hourOfDay <= 18) {
      tempBase = 32 + Math.sin((hourOfDay - 6) * Math.PI / 12) * 5;
    } else {
      tempBase = 25 + Math.sin((hourOfDay - 18) * Math.PI / 12) * 3;
    }
    
    const humidityBase = 70 - Math.sin((hourOfDay - 6) * Math.PI / 12) * 15;
    
    const rainfallChance = Math.random();
    let rainfall = 0;
    if (rainfallChance > 0.7) {
      rainfall = generateRandomValue(0.5, 15);
    }
    
    data.push({
      id: `sensor-${stationId}-${i}`,
      timestamp: generateTimestamp(i),
      temperature: Number((tempBase + generateRandomValue(-2, 2)).toFixed(1)),
      humidity: Number((humidityBase + generateRandomValue(-5, 5)).toFixed(1)),
      rainfall: Number(rainfall.toFixed(1)),
      stationId,
    });
  }
  
  return data;
};

export const generateRealTimeData = (stationId: string): SensorData => {
  const now = new Date();
  const hourOfDay = now.getHours();
  
  let tempBase = 28;
  if (hourOfDay >= 6 && hourOfDay <= 18) {
    tempBase = 32 + Math.sin((hourOfDay - 6) * Math.PI / 12) * 5;
  } else {
    tempBase = 25 + Math.sin((hourOfDay - 18) * Math.PI / 12) * 3;
  }
  
  const humidityBase = 70 - Math.sin((hourOfDay - 6) * Math.PI / 12) * 15;
  
  const rainfallChance = Math.random();
  let rainfall = 0;
  if (rainfallChance > 0.85) {
    rainfall = generateRandomValue(0.5, 10);
  }
  
  return {
    id: `sensor-${stationId}-${Date.now()}`,
    timestamp: now,
    temperature: Number((tempBase + generateRandomValue(-1.5, 1.5)).toFixed(1)),
    humidity: Number((humidityBase + generateRandomValue(-3, 3)).toFixed(1)),
    rainfall: Number(rainfall.toFixed(1)),
    stationId,
  };
};

export const defaultThresholds: Threshold[] = [
  {
    id: 'threshold-temp',
    parameter: 'temperature',
    minValue: 15,
    maxValue: 40,
    warningLevel: 'warning',
    enabled: true,
  },
  {
    id: 'threshold-humidity',
    parameter: 'humidity',
    minValue: 30,
    maxValue: 90,
    warningLevel: 'warning',
    enabled: true,
  },
  {
    id: 'threshold-rainfall',
    parameter: 'rainfall',
    minValue: 0,
    maxValue: 50,
    warningLevel: 'warning',
    enabled: true,
  },
];

export const checkThresholds = (
  data: SensorData,
  thresholds: Threshold[]
): Alert[] => {
  const alerts: Alert[] = [];
  
  thresholds.forEach((threshold) => {
    if (!threshold.enabled) return;
    
    let value = 0;
    let parameterName = '';
    
    switch (threshold.parameter) {
      case 'temperature':
        value = data.temperature;
        parameterName = 'อุณหภูมิ';
        break;
      case 'humidity':
        value = data.humidity;
        parameterName = 'ความชื้น';
        break;
      case 'rainfall':
        value = data.rainfall;
        parameterName = 'ปริมาณน้ำฝน';
        break;
    }
    
    if (value > threshold.maxValue) {
      alerts.push({
        id: `alert-${data.id}-${threshold.parameter}`,
        timestamp: new Date(),
        stationId: data.stationId,
        parameter: threshold.parameter,
        value,
        threshold: threshold.maxValue,
        level: value > threshold.maxValue * 1.2 ? 'critical' : 'warning',
        message: `${parameterName} สูงเกินไป: ${value} (${threshold.parameter === 'temperature' ? '°C' : threshold.parameter === 'humidity' ? '%' : 'mm'})`,
        acknowledged: false,
      });
    } else if (value < threshold.minValue) {
      alerts.push({
        id: `alert-${data.id}-${threshold.parameter}`,
        timestamp: new Date(),
        stationId: data.stationId,
        parameter: threshold.parameter,
        value,
        threshold: threshold.minValue,
        level: value < threshold.minValue * 0.8 ? 'critical' : 'warning',
        message: `${parameterName} ต่ำเกินไป: ${value} (${threshold.parameter === 'temperature' ? '°C' : threshold.parameter === 'humidity' ? '%' : 'mm'})`,
        acknowledged: false,
      });
    }
  });
  
  return alerts;
};
