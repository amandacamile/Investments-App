// @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    colors: {
      'chinese-black': '#121212',
      'light-grey': '#F9F9F9',
      'tangerine-yellow': '#FFC709',
      black: '#000000',
      white: '#ffffff',
    },
    boxShadow: {
      '3xl': '0px 5px 15px rgba(0, 0, 0, 0.35)',
    },
    extend: {},
  },
  plugins: [
    '@tailwindcss/forms',
  ],
};
