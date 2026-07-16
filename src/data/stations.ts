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
    description: 'สถานีวิจัยหลัก ตั้งอยู่ในเขตกรุงเทพมหานคร ทำการตรวจวัดสภาพอากาศและเก็บข้อมูลอย่างต่อเนื่อง ติดตั้งเครื่องมือวัดอุณหภูมิ ความชื้น และปริมาณน้ำฝนอัตโนมัติ',
    images: [
      '/images/stations/bangkok-station.jpg',
    ],
    cameras: [
      {
        id: 'cam-001-01',
        name: 'กล้องหน้าสถานี',
        url: '/images/stations/bangkok-station.jpg',
        isOnline: true,
        lastCapture: new Date(),
      },
    ],
  },
  {
    id: 'station-002',
    name: 'สถานีวิจัยสระแก้ว',
    location: 'สระแก้ว',
    latitude: 13.8144,
    longitude: 102.1884,
    isActive: true,
    lastUpdate: new Date(),
    description: 'สถานีวิจัยประจำจังหวัดสระแก้ว ตั้งอยู่ใกล้ชายแดนไทย-กัมพูชา ทำการ monitoring สภาพอากาศในพื้นที่ภาคตะวันออก',
    images: [
      '/images/stations/sakaeo-station.jpg',
    ],
    cameras: [
      {
        id: 'cam-002-01',
        name: 'กล้องจุดตรวจวัด',
        url: '/images/stations/sakaeo-station.jpg',
        isOnline: true,
        lastCapture: new Date(),
      },
    ],
  },
];

export const getStationById = (id: string): Station | undefined => {
  return stations.find((station) => station.id === id);
};

export const getActiveStations = (): Station[] => {
  return stations.filter((station) => station.isActive);
};
