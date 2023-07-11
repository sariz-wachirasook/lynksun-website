/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/flowbite/**/*.js'],
  theme: {},
  plugins: [require('flowbite/plugin')],
};
