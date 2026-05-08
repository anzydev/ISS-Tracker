import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-neo-accent text-black hover:brightness-90',
  secondary: 'bg-neo-secondary text-black hover:brightness-90',
  outline: 'bg-white dark:bg-neo-dark text-black dark:text-neo-bg hover:bg-gray-100',
  danger: 'bg-black text-white hover:bg-gray-900',
};

export default function NeoButton({ children, variant = 'primary', onClick, disabled, loading, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        border-4 border-black dark:border-neo-bg
        shadow-neo-sm dark:shadow-neo-sm-dark
        neo-btn-push
        font-bold text-sm uppercase tracking-wide
        px-6 py-3 h-12
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
