export interface SensorData {
  id: string;
  timestamp: Date;
  temperature: number;
  humidity: number;
  rainfall: number;
  stationId: string;
}

export interface Station {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  lastUpdate: Date;
}

export interface Threshold {
  id: string;
  parameter: 'temperature' | 'humidity' | 'rainfall';
  minValue: number;
  maxValue: number;
  warningLevel: 'normal' | 'warning' | 'critical';
  enabled: boolean;
}

export interface Alert {
  id: string;
  timestamp: Date;
  stationId: string;
  parameter: 'temperature' | 'humidity' | 'rainfall';
  value: number;
  threshold: number;
  level: 'warning' | 'critical';
  message: string;
  acknowledged: boolean;
}

export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  startDate: Date;
  endDate: Date;
  stationId: string;
  parameters: ('temperature' | 'humidity' | 'rainfall')[];
}

export interface DashboardState {
  darkMode: boolean;
  selectedStation: string;
  thresholds: Threshold[];
  alerts: Alert[];
  timeRange: '24h' | '7d' | '30d';
  showComparison: boolean;
}

export type TimeRange = '24h' | '7d' | '30d';

export interface Statistics {
  parameter: string;
  current: number;
  min: number;
  max: number;
  average: number;
  trend: 'up' | 'down' | 'stable';
}
