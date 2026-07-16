import type { Station } from '../types';

export const stations: Station[] = [
  {
    id: 'station-001',
    name: 'สถานีวิจัยอีเอส วิจัยและพัฒนา',
    location: 'กรุงเทพมหานคร',
    latitude: 13.7563,
    longitude: 100.5018,
    isActive: true,
    lastUpdate: new Date(),
  },
  {
    id: 'station-002',
    name: 'สถานีวิจัยสระแก้ว',
    location: 'สระแก้ว',
    latitude: 13.8144,
    longitude: 102.1884,
    isActive: true,
    lastUpdate: new Date(),
  },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find((station) => station.id === id);
};

export const getActiveStations = (): Station[] => {
  return stations.filter((station) => station.isActive);
};
