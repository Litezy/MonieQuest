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
        "lightgreen": "#00fe5e",
        "font": "#a9a9ca",
        "bg-green":"#18a26b",
        "dark":"#141523"
      }
    },
  },
  plugins: [],
}

