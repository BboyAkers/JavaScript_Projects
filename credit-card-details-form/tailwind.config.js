/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{svelte,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'main-mobile': "url('https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/27413fd2-992a-4cb4-d75e-e10990957600/public')",
        'main-desktop': "url('https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/27413fd2-992a-4cb4-d75e-e10990957600/public')",
      }
    },
  },
  plugins: [],
}
