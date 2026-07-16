import type { SensorData } from '../types';
import { calculateStatistics, getParameterLabel, getParameterUnit } from '../utils/calculationUtils';

interface ComparisonViewProps {
  data: SensorData[];
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ data }) => {
  const parameters = ['temperature', 'humidity', 'rainfall'] as const;
  
  const stats = parameters.map((param) => ({
    parameter: param,
    ...calculateStatistics(data, param),
  }));

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          เปรียบเทียบข้อมูล
        </h3>
        <span className="status-badge status-normal">เปรียบเทียบ</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                พารามิเตอร์
              </th>
              <th scope="col" className="px-4 py-3">
                ปัจจุบัน
              </th>
              <th scope="col" className="px-4 py-3">
                เฉลี่ย
              </th>
              <th scope="col" className="px-4 py-3">
                ต่ำสุด
              </th>
              <th scope="col" className="px-4 py-3">
                สูงสุด
              </th>
              <th scope="col" className="px-4 py-3">
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr
                key={stat.parameter}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {getParameterLabel(stat.parameter)}
                </td>
                <td className="px-4 py-3">
                  {stat.current} {getParameterUnit(stat.parameter)}
                </td>
                <td className="px-4 py-3">
                  {stat.average} {getParameterUnit(stat.parameter)}
                </td>
                <td className="px-4 py-3 text-green-600 dark:text-green-400">
                  {stat.min} {getParameterUnit(stat.parameter)}
                </td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400">
                  {stat.max} {getParameterUnit(stat.parameter)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`status-badge ${
                      stat.trend === 'up'
                        ? 'status-warning'
                        : stat.trend === 'down'
                        ? 'status-normal'
                        : 'status-normal'
                    }`}
                  >
                    {stat.trend === 'up'
                      ? 'เพิ่มขึ้น'
                      : stat.trend === 'down'
                      ? 'ลดลง'
                      : 'คงที่'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          * ข้อมูลเปรียบเทียบจากข้อมูลย้อนหลัง 24 ชั่วโมง
        </p>
      </div>
    </div>
  );
};

export default ComparisonView;
