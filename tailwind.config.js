/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    colors: {
      primary: '#283149',
      secondary: '#f5793b',
      white: '#ffffff',
      dark: '#3a476a',
      black: '#161b28',
      orange: '#f79a6b',
    },
  },
  plugins: [require('flowbite/plugin')],
};
