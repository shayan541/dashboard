/** @type {import('tailwindcss').Config} */
export default {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{

     
      darkBg: "#003246",
      darkText: "#2c8cb2",
      darkbtn:"#0a63bd",

      gold :{
        100:"#d3c7aa",
        200:"#b29b66"
      }
    }
    },
    
  },
  plugins: [],
}
