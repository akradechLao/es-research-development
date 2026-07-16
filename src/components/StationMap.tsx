import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { stations } from '../data/stations';
import { useApp } from '../context/AppContext';
import 'leaflet/dist/leaflet.css';

const createCustomIcon = (isActive: boolean) => {
  const color = isActive ? '#22c55e' : '#ef4444';
  const svgIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `;
  
  return L.divIcon({
    html: svgIcon,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const StationMap: React.FC = () => {
  const { selectedStation, setSelectedStation } = useApp();
  
  const center: [number, number] = [13.8, 101.3];
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          แผนที่จุดติดตั้งสถานี
        </h3>
        <span className="status-badge status-normal">{stations.length} สถานี</span>
      </div>
      
      <div className="h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={createCustomIcon(station.isActive)}
              eventHandlers={{
                click: () => {
                  setSelectedStation(station.id);
                },
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h4 className="font-semibold text-gray-800 mb-2">{station.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{station.location}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${station.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="text-sm text-gray-600">
                      {station.isActive ? 'สถานะปกติ' : 'ออฟไลน์'}
                    </span>
                  </div>
                  {station.images && station.images.length > 0 && (
                    <img
                      src={station.images[0]}
                      alt={station.name}
                      className="w-full h-32 object-cover rounded-lg mt-2"
                    />
                  )}
                  <button
                    onClick={() => setSelectedStation(station.id)}
                    className="mt-2 w-full bg-primary-600 text-white py-1 px-3 rounded-lg text-sm hover:bg-primary-700 transition-colors"
                  >
                    เลือกสถานีนี้
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          {stations.map((station) => (
            <div
              key={station.id}
              className={`flex items-center gap-2 cursor-pointer hover:text-primary-600 transition-colors ${
                selectedStation === station.id ? 'text-primary-600 font-medium' : ''
              }`}
              onClick={() => setSelectedStation(station.id)}
            >
              <div
                className={`w-3 h-3 rounded-full ${
                  station.isActive ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></div>
              <span>{station.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationMap;
