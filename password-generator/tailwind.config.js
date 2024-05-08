/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{svelte,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'grey': {
          light: '#817D92',
          DEFAULT: '#24232C',
          dark: '#18171F'
        },
        'green': {
          DEFAULT: '#A4FFAF'
        },
        'red': {
          DEFAULT: '#F64A4A'
        },
        'orange': {
          DEFAULT: '#FB7C58'
        },
        'yellow': {
          DEFAULT: '#F8CD65'
        },
        'white': {
          light: '#FFFFFF',
          DEFAULT: '#E6E5EA'
        }
      }
    },
  },
  plugins: [],
}

