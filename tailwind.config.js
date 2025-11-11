/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#131417',
        'brand-surface': '#1A1B1F',
        'brand-primary': '#8A63D2',
        'brand-secondary': '#4A9DFF',
        'brand-accent': '#33D17E',
        'brand-text-primary': '#E4E4E7',
        'brand-text-secondary': '#A0A0A5',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      }
    },
  },
  plugins: [],
}