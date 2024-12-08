/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#212134",
        "secondary": "#171828",
        "ash": "#204b53",
        "lightgreen": "#01d676",
        "font": "#a9a9ca",
      }
    },
  },
  plugins: [],
}

