import React from 'react';

export default function NeoInput({ value, onChange, placeholder, className = '', ...props }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`
        w-full h-14 px-4
        bg-white dark:bg-neo-dark-surface
        border-4 border-black dark:border-neo-bg
        font-bold text-lg text-black dark:text-neo-bg
        placeholder:text-black/40 dark:placeholder:text-neo-bg/40
        focus:bg-neo-secondary focus:shadow-neo-sm focus:outline-none focus:ring-0
        dark:focus:bg-neo-secondary dark:focus:text-black
        ${className}
      `}
      {...props}
    />
  );
}
