/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'apps/client/src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'vera-cream': '#FEF2E4',
        'vera-green': '#DBF9BE',
        'vera-pink': '#FFDEE0',
        'vera-blue': '#B4D2FF',
        primary: "#232321",
      },
      fontFamily: {
        display: ["Merriweather", "serif"],
        sans: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1.25rem",
      },
    },
  },
  plugins: [],
};
