/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-blue-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200'
  ],
  theme: {
    extend: {
      colors: {
        'primary' : "#89ABE3FF",
        'secondary' : "#EA738DFF",
        'secondary-dark': "#d24a68",
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
