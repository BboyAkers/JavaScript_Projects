/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          light: '#0079FF',
          DEFAULT: '#4B6A9B',
          dark: '#1E2A47'
        },
        'gray': {
          DEFAULT: '#697C9A',
          dark: '#2B3442'
        },
        'white': {
          light: '#FFFFFF',
          DEFAULT: '#FEFEFE',
          dark: '#F6F8FF'
        },
        'navyBlue': {
          DEFAULT: '#141D2F',
        },
      },
    },
  },
  plugins: [],
}
