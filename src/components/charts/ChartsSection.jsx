import React from 'react';
import { BarChart3, Star } from 'lucide-react';
import SpeedChart from './SpeedChart';
import NewsDistributionChart from './NewsDistributionChart';

export default function ChartsSection({ speeds, articles, onCategoryClick, darkMode }) {
  return (
    <section id="charts-section" className="relative py-16 px-4 sm:px-8 bg-halftone">
      {/* Decorative */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <Star className="w-10 h-10 text-neo-muted animate-spin-slow" strokeWidth={3} fill="#C4B5FD" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title */}
        <div className="flex items-center gap-4">
          <div className="bg-neo-muted border-4 border-black p-3 shadow-neo-sm">
            <BarChart3 className="w-8 h-8 text-black" strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-black dark:text-neo-bg leading-none">
              DATA <span className="text-stroke">VIZ</span>
            </h2>
            <p className="text-sm uppercase tracking-widest font-bold text-black/60 dark:text-neo-bg/60 mt-1">
              Interactive Charts & Visualizations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SpeedChart speeds={speeds} darkMode={darkMode} />
          <NewsDistributionChart articles={articles} onCategoryClick={onCategoryClick} darkMode={darkMode} />
        </div>
      </div>
    </section>
  );
}
