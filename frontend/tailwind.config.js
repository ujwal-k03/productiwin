/** @type {import('tailwindcss').Config} */
module.exports = {
  'darkMode': 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-blue-500',
    'bg-red-500',
    'bg-green-500',
    'bg-yellow-500',
    'dark:bg-red-600',
    'dark:bg-blue-600',
    'dark:bg-green-600',
    'dark:bg-yellow-600',
    'opacity-50',
    'opacity-0',
    'auto-rows-[110px]',
    'auto-rows-[92px]',
  ],
  theme: {
    extend: {
      colors: {
        'primary' : "#89ABE3FF",
        'secondary' : "#EA738DFF",
        'secondary-dark': "#d24a68",
        'canvas-dark': '#463E61',
        'canvas-light': '#B1A0DA',
      },
      fontFamily: {
        'nunito': ['Nunito']
      },
      height: {
        'fuck-you': "70vh",
        '9/10': "90%",
      },
    },
  },
  plugins: [],
}
