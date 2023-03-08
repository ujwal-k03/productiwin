/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
        'fuck-you': "70vh"
      }
    },
  },
  plugins: [],
}
