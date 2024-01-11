/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'intro-desktop': "url('https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/6eb85e6f-a259-4250-704a-33963bff3900/public')",
        'intro-mobile': "url('https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/eb22918c-879e-408d-4ea9-8cc4a9f18a00/public')"
      },
      colors: {
        'orange': {
          DEFAULT: '#FF7979'
        },
        'green': {
          DEFAULT: '#38CC8B'
        },
        'purple': {
          light: '#BAB7D4',
          DEFAULT: '#5E54A4'
        },
        'black': {
          DEFAULT: '#3D3B48'
        },
        'gray': {
          DEFAULT: '#DEDEDE'
        }
      }
    },
  },
  plugins: [],
}

