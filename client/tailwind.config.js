/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EF4444', // Red Accent
        background: '#1E1E1E', // Dark Theme Background
        text: '#FFFFFF', // White Text
      },
    },
  },
  plugins: [],
};
