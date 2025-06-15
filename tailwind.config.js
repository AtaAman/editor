/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  
  plugins: [require("tailwind-scrollbar"), require("tailwind-scrollbar-hide")],

  theme: {
    extend: {
      colors: {
        primary: "#fb8500",
        secondary:"#023047",
        base: "#8ecae6",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
