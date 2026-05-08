/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neo: {
          bg: '#FFFDF5',
          fg: '#000000',
          accent: '#FF6B6B',
          secondary: '#FFD93D',
          muted: '#C4B5FD',
          dark: '#1A1A1A',
          'dark-surface': '#2A2A2A',
        }
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '4px 4px 0px 0px #000',
        'neo-md': '8px 8px 0px 0px #000',
        'neo-lg': '12px 12px 0px 0px #000',
        'neo-xl': '16px 16px 0px 0px #000',
        'neo-sm-dark': '4px 4px 0px 0px #FFFDF5',
        'neo-md-dark': '8px 8px 0px 0px #FFFDF5',
      },
      animation: {
        'spin-slow': 'spin-slow 10s linear infinite',
        'bounce-neo': 'bounce-neo 0.5s ease-out',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'bounce-neo': {
          '0%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-8px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
