/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-1": "#0F172A",
        "blue-1": "#137FEC",
        "gray-1": "#94A3B8",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
