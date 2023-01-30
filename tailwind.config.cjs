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
        drearylake : "url('./DrearyLake.jpg')",
        forestshore : "url('./ForestShore.jpg')"

      }
    },
  },
  plugins: [],
}
