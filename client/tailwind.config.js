// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",  // make sure this matches your structure
    ],
    theme: {
      extend: {
        colors: {
              //   customGray: "#A3A3A0",
            red : "#111111"
        },
      },
    },
    plugins: [],
  }
  