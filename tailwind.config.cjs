/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        autofit: "repeat(auto-fit, minmax(3rem, 1fr))"
      },
      gridTemplateRows:{
        autofit: "repeat(auto-fit, minmax(3rem, 1fr))"
      },
      colors:{
        darkblue: '#274472',
        midnightblue: '#41729F',
        babyblue: '#C3E0E5'
      },
      backgroundImage: {
        drearylake : "url('/DrearyLake.jpg')",
        forestshore : "url('/ForestShore.jpg')"

      },
      boxShadow: {
        normal : "-1px 0.25rem 1px rgb(55, 65, 81)",
        down: "0rem 0rem rgb(55, 65, 81)"
      }
    },
  },
  plugins: [],
}
