const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      height: {
        'screen-85': '85vh',
        'screen-95': '95vh',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}