import React from 'react';

export default function NeoCard({ children, className = '', header, headerColor = 'bg-neo-muted', onClick, noLift }) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white dark:bg-neo-dark-surface border-4 border-black dark:border-neo-bg
        shadow-neo-md dark:shadow-neo-md-dark
        ${noLift ? '' : 'neo-card-lift cursor-default'}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {header && (
        <div className={`${headerColor} border-b-4 border-black dark:border-neo-bg px-6 py-3`}>
          <h3 className="font-bold text-sm uppercase tracking-widest text-black">{header}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
