import React from 'react';
import { MapPin, Gauge, Navigation, Hash, RefreshCw } from 'lucide-react';
import NeoButton from '../ui/NeoButton';

const StatBox = ({ icon: Icon, label, value, color }) => (
  <div className={`${color} border-4 border-black dark:border-neo-bg shadow-neo-sm p-4 flex items-center gap-4`}>
    <div className="bg-black p-2 border-2 border-black">
      <Icon className="w-6 h-6 text-white" strokeWidth={3} />
    </div>
    <div>
      <p className="text-xs uppercase tracking-widest font-bold opacity-70">{label}</p>
      <p className="text-lg font-bold text-black leading-tight">{value}</p>
    </div>
  </div>
);

export default function ISSStats({ currentPosition, currentSpeed, locationName, positionCount, onRefresh, loading }) {
  if (!currentPosition) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatBox
          icon={MapPin}
          label="Latitude"
          value={currentPosition.latitude.toFixed(4) + '°'}
          color="bg-neo-secondary"
        />
        <StatBox
          icon={Navigation}
          label="Longitude"
          value={currentPosition.longitude.toFixed(4) + '°'}
          color="bg-neo-muted"
        />
        <StatBox
          icon={Gauge}
          label="Speed"
          value={currentSpeed.toLocaleString() + ' km/h'}
          color="bg-neo-accent"
        />
        <StatBox
          icon={MapPin}
          label="Location"
          value={locationName.length > 35 ? locationName.slice(0, 35) + '…' : locationName}
          color="bg-white dark:bg-neo-dark-surface"
        />
        <StatBox
          icon={Hash}
          label="Positions Tracked"
          value={positionCount}
          color="bg-neo-secondary"
        />
        <div className="flex items-center justify-center">
          <NeoButton onClick={onRefresh} loading={loading} variant="primary" className="w-full h-full">
            <RefreshCw className="w-5 h-5" strokeWidth={3} />
            Refresh
          </NeoButton>
        </div>
      </div>
    </div>
  );
}
