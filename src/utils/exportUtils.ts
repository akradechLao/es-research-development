import type { SensorData, ExportOptions } from '../types';
import { format } from 'date-fns';

export const exportToCSV = (data: SensorData[]): string => {
  const headers = ['Timestamp', 'Temperature (°C)', 'Humidity (%)', 'Rainfall (mm)', 'Station ID'];
  const rows = data.map((d) => [
    format(new Date(d.timestamp), 'yyyy-MM-dd HH:mm:ss'),
    d.temperature.toString(),
    d.humidity.toString(),
    d.rainfall.toString(),
    d.stationId,
  ]);
  
  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
};

export const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportData = (data: SensorData[], options: ExportOptions) => {
  const filteredData = data.filter((d) => {
    const date = new Date(d.timestamp);
    return date >= options.startDate && date <= options.endDate;
  });

  const timestamp = format(new Date(), 'yyyy-MM-dd_HH-mm');
  
  switch (options.format) {
    case 'csv': {
      const csv = exportToCSV(filteredData);
      downloadFile(csv, `weather-data-${timestamp}.csv`, 'text/csv');
      break;
    }
    case 'excel': {
      const excelContent = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:spreadsheet">
          <head>
            <meta charset="UTF-8">
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #4CAF50; color: white; }
              tr:nth-child(even) { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <table>
              <tr>
                <th>Timestamp</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Rainfall (mm)</th>
                <th>Station ID</th>
              </tr>
              ${filteredData.map((d) => `
                <tr>
                  <td>${format(new Date(d.timestamp), 'yyyy-MM-dd HH:mm:ss')}</td>
                  <td>${d.temperature}</td>
                  <td>${d.humidity}</td>
                  <td>${d.rainfall}</td>
                  <td>${d.stationId}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;
      downloadFile(excelContent, `weather-data-${timestamp}.xls`, 'application/vnd.ms-excel');
      break;
    }
    case 'pdf': {
      alert('PDF export จะพร้อมใช้งานในเวอร์ชันถัดไป');
      break;
    }
  }
};
