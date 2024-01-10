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
        'card-front': "url('https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/b93e1bcd-2901-43dc-2f01-c3a2b4c99c00/public')",
        'card-back': "url('https://imagedelivery.net/nGYhisqu4x6SCDrz5V8Qxg/19c2dbf6-506c-4caf-7e31-bd6d9d31e100/public')",
      }
    },
  },
  plugins: [],
}
