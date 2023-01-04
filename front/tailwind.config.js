/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["'Roboto'", 'sans-serif'],
        poppins: ["'Poppins'", 'sans-serif'],
      },
      colors: {
        cyan: '#2da9a9',
        lemon: '#d7e26a',
      },
      backgroundImage: {
        blobs: "url('../assets/blob-scene-haikei.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('prettier-plugin-tailwindcss')],
};
