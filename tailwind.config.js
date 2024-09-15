/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['rounded'], // Enable the 'rounded' variant for scrollbars
  },
  plugins: [
    require('tailwind-scrollbar'), // Add the scrollbar plugin
  ],
}