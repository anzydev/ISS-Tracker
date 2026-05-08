import React from 'react';
import { Satellite, Star } from 'lucide-react';
import ISSMap from './ISSMap';
import ISSStats from './ISSStats';
import AstronautList from './AstronautList';
import { Spinner } from '../ui/Loader';
import NeoButton from '../ui/NeoButton';

export default function ISSSection({ issData, darkMode }) {
  const { currentPosition, positions, currentSpeed, locationName, astronauts, loading, error, refresh } = issData;

  return (
    <section id="iss-section" className="relative py-16 px-4 sm:px-8 bg-grid">
      {/* Decorative elements */}
      <div className="absolute top-8 right-8 hidden lg:block">
        <Star className="w-12 h-12 text-neo-accent animate-spin-slow" strokeWidth={3} fill="#FF6B6B" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Title */}
        <div className="flex items-center gap-4">
          <div className="bg-neo-accent border-4 border-black p-3 shadow-neo-sm">
            <Satellite className="w-8 h-8 text-black" strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black dark:text-neo-bg leading-none">
              ISS <span className="text-stroke">TRACKER</span>
            </h2>
            <p className="text-sm uppercase tracking-widest font-bold text-black/60 dark:text-neo-bg/60 mt-1">
              Live International Space Station Tracking
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-neo-accent border-4 border-black p-4 flex items-center justify-between">
            <span className="font-bold text-black">⚠ Error: {error}</span>
            <NeoButton onClick={refresh} variant="outline">Retry</NeoButton>
          </div>
        )}

        {loading && !currentPosition ? (
          <Spinner size="lg" />
        ) : (
          <>
            {/* Map */}
            <ISSMap currentPosition={currentPosition} positions={positions} darkMode={darkMode} />

            {/* Stats */}
            <ISSStats
              currentPosition={currentPosition}
              currentSpeed={currentSpeed}
              locationName={locationName}
              positionCount={positions.length}
              onRefresh={refresh}
              loading={loading}
            />

            {/* Astronauts */}
            <AstronautList astronauts={astronauts} />
          </>
        )}
      </div>
    </section>
  );
}
