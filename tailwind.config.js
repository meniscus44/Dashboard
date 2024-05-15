/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-color": "#37146B",
        "deployed-green": "#00B88C",
        "cards-head": "#595959",
        "in-progress": "#F39C12",
        "failed": "#E91F04",
        "sub-text": "#A5A5A5"
      },
      fontSize: {
        "xsm": "10px"
      }
    },
  },
  plugins: [],
}

