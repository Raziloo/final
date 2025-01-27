/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      transitionProperty: {
        bg: 'background-color, color', // Custom transition property
      },
      animation: {
        pulse: 'pulse 6s ease-in-out infinite',
        ping: 'ping 8s linear infinite',
        spin: 'spin 10s linear infinite',
        bounce: 'bounce 9s ease-in-out infinite',
        gradient: 'gradient 0.5s ease-in-out',
        alert: 'alert 0.5s ease-out',
      },
      keyframes: {
        alert: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '50%': {
            transform: 'translateY(-10%)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        pulse: {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        },
        ping: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(2)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

