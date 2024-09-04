/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'stars': "url('/assets/background-stars.svg')"
      },
      colors: {
        white: {
          DEFAULT: '#FFFFFF',
        },
        blue: {
          light: '#419EBB',
          DEFAULT: '#2D68F0',
          dark: '#070724',
        },
        grey: {
          DEFAULT: '#838391',
          dark: '#38384F',
        },
        yellow: {
          DEFAULT: '#EDA249',
        },
        purple: {
          DEFAULT: '#6D2ED6',
        },
        red: {
          DEFAULT: '#D83A34',
        },
        orange: {
          light: '#D14C32',
          DEFAULT: '#CD5120',
        },
        aqua: {
          DEFAULT: '#1EC1A2',
        }

      }
    },
  },
  plugins: [],
}

