import { useState } from 'react';
import type { SensorData, ExportOptions } from '../types';
import { exportData } from '../utils/exportUtils';
import { format } from 'date-fns';

interface ExportDataProps {
  data: SensorData[];
}

const ExportData: React.FC<ExportDataProps> = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState<ExportOptions>({
    format: 'csv',
    startDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    endDate: new Date(),
    stationId: 'station-001',
    parameters: ['temperature', 'humidity', 'rainfall'],
  });

  const handleExport = () => {
    exportData(data, options);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn-primary flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        ส่งออกข้อมูล
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>

            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    ส่งออกข้อมูล
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label-text">รูปแบบไฟล์</label>
                    <select
                      value={options.format}
                      onChange={(e) =>
                        setOptions({ ...options, format: e.target.value as 'csv' | 'excel' | 'pdf' })
                      }
                      className="input-field"
                    >
                      <option value="csv">CSV</option>
                      <option value="excel">Excel</option>
                      <option value="pdf">PDF</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label-text">วันที่เริ่มต้น</label>
                      <input
                        type="date"
                        value={format(options.startDate, 'yyyy-MM-dd')}
                        onChange={(e) =>
                          setOptions({ ...options, startDate: new Date(e.target.value) })
                        }
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="label-text">วันที่สิ้นสุด</label>
                      <input
                        type="date"
                        value={format(options.endDate, 'yyyy-MM-dd')}
                        onChange={(e) =>
                          setOptions({ ...options, endDate: new Date(e.target.value) })
                        }
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-text">พารามิเตอร์</label>
                    <div className="flex flex-wrap gap-2">
                      {(['temperature', 'humidity', 'rainfall'] as const).map((param) => (
                        <label key={param} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={options.parameters.includes(param)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setOptions({
                                  ...options,
                                  parameters: [...options.parameters, param],
                                });
                              } else {
                                setOptions({
                                  ...options,
                                  parameters: options.parameters.filter((p) => p !== param),
                                });
                              }
                            }}
                            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {param === 'temperature'
                              ? 'อุณหภูมิ'
                              : param === 'humidity'
                              ? 'ความชื้น'
                              : 'ปริมาณน้ำฝน'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleExport}
                  className="btn-primary sm:ml-3"
                >
                  ส่งออก
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary mt-3 sm:mt-0"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportData;
