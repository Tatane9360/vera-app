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
      },
    },
  },
  plugins: [],
};
