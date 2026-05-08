import React from 'react';

export function Skeleton({ className = '', count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bg-black/10 dark:bg-neo-bg/10 border-4 border-black/20 dark:border-neo-bg/20 skeleton-pulse ${className}`}
        />
      ))}
    </>
  );
}

export function CardSkeleton() {
  return (
    <div className="border-4 border-black/20 dark:border-neo-bg/20 bg-white dark:bg-neo-dark-surface p-6 skeleton-pulse">
      <div className="bg-black/10 dark:bg-neo-bg/10 h-40 mb-4 border-2 border-black/10" />
      <div className="bg-black/10 dark:bg-neo-bg/10 h-6 mb-2 w-3/4" />
      <div className="bg-black/10 dark:bg-neo-bg/10 h-4 mb-2 w-full" />
      <div className="bg-black/10 dark:bg-neo-bg/10 h-4 w-2/3" />
    </div>
  );
}

export function Spinner({ size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizes[size]} border-4 border-black dark:border-neo-bg border-t-neo-accent animate-spin`}
        style={{ borderRadius: '0' }}
      />
    </div>
  );
}
