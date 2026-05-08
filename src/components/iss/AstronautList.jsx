import React from 'react';
import { Users, Rocket } from 'lucide-react';
import NeoCard from '../ui/NeoCard';
import NeoBadge from '../ui/NeoBadge';

export default function AstronautList({ astronauts }) {
  if (!astronauts || !astronauts.number) return null;

  // Group by craft
  const byCraft = {};
  astronauts.people.forEach((p) => {
    if (!byCraft[p.craft]) byCraft[p.craft] = [];
    byCraft[p.craft].push(p.name);
  });

  return (
    <NeoCard header="👨‍🚀 People In Space" headerColor="bg-neo-accent">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <NeoBadge color="secondary" rotate={-2}>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" strokeWidth={3} />
              {astronauts.number} Total
            </span>
          </NeoBadge>
        </div>

        {Object.entries(byCraft).map(([craft, names]) => (
          <div key={craft}>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4" strokeWidth={3} />
              <span className="font-bold text-sm uppercase tracking-wide text-black dark:text-neo-bg">{craft}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {names.map((name) => (
                <span
                  key={name}
                  className="bg-neo-bg dark:bg-neo-dark border-2 border-black dark:border-neo-bg px-3 py-1 text-sm font-bold text-black dark:text-neo-bg"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </NeoCard>
  );
}
