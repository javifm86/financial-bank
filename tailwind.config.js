const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: colors.lightBlue,
        yellow: colors.amber,
        green: colors.emerald
      }
    }
  },
  variants: {},
  plugins: []
};
