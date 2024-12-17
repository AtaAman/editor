/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), 
    require('tailwind-scrollbar-hide'),
  ],

  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         "primary": "#1fbfb3",
  //         "secondary": "#d46b02",
  //         "accent": "#6612db",
  //         "neutral": "#db0f53",
  //         "base-100": "#ffffff",
  //       },
  //     },
  //   ],
  //   dark:"mytheme"
  // },
}

