import { useState, useEffect, useCallback } from 'react';
import type { SensorData } from '../types';
import { generateMockData, generateRealTimeData, checkThresholds } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const useRealTimeData = (stationId: string) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [currentData, setCurrentData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const { thresholds, addAlert } = useApp();

  const loadData = useCallback(() => {
    setLoading(true);
    const historicalData = generateMockData(stationId, 24);
    setData(historicalData);
    
    const latestData = generateRealTimeData(stationId);
    setCurrentData(latestData);
    
    const newAlerts = checkThresholds(latestData, thresholds);
    newAlerts.forEach((alert) => addAlert(alert));
    
    setLoading(false);
  }, [stationId, thresholds, addAlert]);

  useEffect(() => {
    loadData();
    
    const interval = setInterval(() => {
      const latestData = generateRealTimeData(stationId);
      setCurrentData(latestData);
      
      setData((prev) => {
        const newData = [...prev, latestData];
        if (newData.length > 25) {
          return newData.slice(newData.length - 25);
        }
        return newData;
      });
      
      const newAlerts = checkThresholds(latestData, thresholds);
      newAlerts.forEach((alert) => addAlert(alert));
    }, 30000);

    return () => clearInterval(interval);
  }, [stationId, loadData, thresholds, addAlert]);

  return { data, currentData, loading, refresh: loadData };
};

export const useHistoricalData = (stationId: string, hours: number) => {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const historicalData = generateMockData(stationId, hours);
    setData(historicalData);
    setLoading(false);
  }, [stationId, hours]);

  return { data, loading };
};
