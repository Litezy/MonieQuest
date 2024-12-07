/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": "#212134",
        "btn": "#204b53",
        "btn2": "#01d676",
        "orange": "#E96E28",
        "font": "#ffffff",
        "font2": "#a9a9ca",
      }
    },
  },
  plugins: [],
}

