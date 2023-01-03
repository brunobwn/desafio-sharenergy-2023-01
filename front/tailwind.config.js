/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto'", 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('prettier-plugin-tailwindcss')],
};
