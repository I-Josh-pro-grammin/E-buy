import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html', // Include your HTML files
    './src/**/*.{js,jsx,ts,tsx}', // Include your JS/TS files (if applicable)
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbitePlugin],
}
