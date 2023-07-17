/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      boxShadow: {
        lg: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 2.5px 15px -3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: ['autumn', 'light', 'dark'],
  },
};
