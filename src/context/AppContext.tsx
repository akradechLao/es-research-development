import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Threshold, Alert, TimeRange } from '../types';
import { defaultThresholds } from '../data/mockData';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  selectedStation: string;
  setSelectedStation: (stationId: string) => void;
  thresholds: Threshold[];
  updateThreshold: (threshold: Threshold) => void;
  alerts: Alert[];
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (alertId: string) => void;
  clearAlerts: () => void;
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  showComparison: boolean;
  setShowComparison: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  
  const [selectedStation, setSelectedStation] = useState('station-001');
  const [thresholds, setThresholds] = useState<Threshold[]>(defaultThresholds);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [showComparison, setShowComparison] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newValue));
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newValue;
    });
  }, []);

  const updateThreshold = useCallback((threshold: Threshold) => {
    setThresholds((prev: Threshold[]) =>
      prev.map((t) => (t.id === threshold.id ? threshold : t))
    );
  }, []);

  const addAlert = useCallback((alert: Alert) => {
    setAlerts((prev: Alert[]) => [alert, ...prev].slice(0, 50));
  }, []);

  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts((prev: Alert[]) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        selectedStation,
        setSelectedStation,
        thresholds,
        updateThreshold,
        alerts,
        addAlert,
        acknowledgeAlert,
        clearAlerts,
        timeRange,
        setTimeRange,
        showComparison,
        setShowComparison,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
