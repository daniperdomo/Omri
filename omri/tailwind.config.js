/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-hover': '#e8dcb5', 
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite', // Animación personalizada
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}