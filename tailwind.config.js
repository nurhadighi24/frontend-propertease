/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-primary": "#021526",
        "blue-secondary": "#03346E",
        "green-primary": "#5BEA44",
        "gray-primary": "#E2E2B6",
        "gray-secondary": "#C9C9C9",
        "green-edit": "#00791B",
        "red-delete": "#FF0000",
      },
    },
  },
  plugins: [],
};
