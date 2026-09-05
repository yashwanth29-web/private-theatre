/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: '#07080c',
          charcoal: '#0e1017',
          surface: '#141722',
          border: 'rgba(255, 255, 255, 0.08)',
          // Tasteful Green & Yellow brand accents
          green: '#22c55e',
          'green-light': '#4ade80',
          yellow: '#eab308',
          'yellow-light': '#facc15',
          gold: '#facc15',
        },
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
