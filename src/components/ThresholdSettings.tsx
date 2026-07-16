import { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Threshold } from '../types';
import { getParameterLabel } from '../utils/calculationUtils';

const ThresholdSettings: React.FC = () => {
  const { thresholds, updateThreshold } = useApp();
  const [editingThreshold, setEditingThreshold] = useState<Threshold | null>(null);

  const handleSave = () => {
    if (editingThreshold) {
      updateThreshold(editingThreshold);
      setEditingThreshold(null);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          ตั้งค่าขีดจำกัด
        </h3>
        <span className="status-badge status-normal">ตั้งค่า</span>
      </div>

      <div className="space-y-4">
        {thresholds.map((threshold) => (
          <div
            key={threshold.id}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {getParameterLabel(threshold.parameter)}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={threshold.enabled}
                  onChange={(e) =>
                    updateThreshold({ ...threshold, enabled: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>

            {threshold.enabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    ค่าต่ำสุด
                  </label>
                  <input
                    type="number"
                    value={threshold.minValue}
                    onChange={(e) =>
                      setEditingThreshold({
                        ...threshold,
                        minValue: Number(e.target.value),
                      })
                    }
                    onBlur={handleSave}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    ค่าสูงสุด
                  </label>
                  <input
                    type="number"
                    value={threshold.maxValue}
                    onChange={(e) =>
                      setEditingThreshold({
                        ...threshold,
                        maxValue: Number(e.target.value),
                      })
                    }
                    onBlur={handleSave}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThresholdSettings;
