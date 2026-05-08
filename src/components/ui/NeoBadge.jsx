import React from 'react';

const colorMap = {
  accent: 'bg-neo-accent',
  secondary: 'bg-neo-secondary',
  muted: 'bg-neo-muted',
  black: 'bg-black text-white',
};

export default function NeoBadge({ children, color = 'accent', rotate = 0, className = '' }) {
  const rotateClass = rotate > 0 ? `rotate-${rotate}` : rotate < 0 ? `-rotate-${Math.abs(rotate)}` : '';
  
  return (
    <span
      className={`
        inline-block
        ${colorMap[color] || colorMap.accent}
        border-4 border-black
        shadow-neo-sm
        font-bold text-xs uppercase tracking-widest
        px-3 py-1
        ${className}
      `}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {children}
    </span>
  );
}
