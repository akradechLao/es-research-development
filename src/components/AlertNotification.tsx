import { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Alert } from '../types';
import { format } from 'date-fns';

const AlertNotification: React.FC = () => {
  const { alerts, acknowledgeAlert } = useApp();
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const unacknowledged = alerts.filter((a) => !a.acknowledged);
    setVisibleAlerts(unacknowledged.slice(0, 3));
  }, [alerts]);

  useEffect(() => {
    if (visibleAlerts.length > 0) {
      const timer = setTimeout(() => {
        setVisibleAlerts((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [visibleAlerts]);

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {visibleAlerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm animate-slide-in ${
            alert.level === 'critical'
              ? 'bg-red-500 text-white'
              : 'bg-yellow-500 text-white'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {alert.level === 'critical' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{alert.message}</p>
              <p className="text-sm opacity-90">
                {format(new Date(alert.timestamp), 'HH:mm:ss')}
              </p>
            </div>
            <button
              onClick={() => acknowledgeAlert(alert.id)}
              className="flex-shrink-0 text-white/80 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertNotification;
