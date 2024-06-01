/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#28303F",
        "blue-secondary": "#0882D4",
        "green-primary": "#5BEA44",
        "gray-primary": "#F0EFEF",
      },
    },
  },
  plugins: [],
};
