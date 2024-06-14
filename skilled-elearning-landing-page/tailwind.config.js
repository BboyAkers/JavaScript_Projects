/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          light: '#4851FF',
          DEFAULT: '#666CA3',
          dark: '#13183F',
        },
        'gray': {
          DEFAULT: '#83869A',
        },
        'pink': {
          light: '#FFA7C3',
          DEFAULT: '#F02AA6', // For gradient
          dark: '#F74780',
        },
        'orange': {
          DEFAULT: '#FF6F48',
        },
      }
    },
  },
  plugins: [],
}

