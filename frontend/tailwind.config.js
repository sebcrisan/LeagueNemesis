/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: [
    "./src/**/*.{js,jsx}", // This will include all JS and JSX files in the src/ directory
    "./public/index.html", // This includes your main HTML file
  ],
};
