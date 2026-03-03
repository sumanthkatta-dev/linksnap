/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nt-red': '#D71921',
        'nt-black': '#000000',
        'nt-white': '#FFFFFF',
        'nt-gray': '#1C1C1C',
      },
      fontFamily: {
        dot: ['DotGothic16', 'monospace'],
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
