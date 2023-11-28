/** @type {import('tailwindcss').Config} */

// const withMT = require("@material-tailwind/html/utils/withMT");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { "clear-white": "#ffffff88", "semiclear-white": "#ffffffdd" },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": "opacity: 0",
          "100%": "opacity: 1",
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        horizshake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        horizshake: "horizshake 150ms ease-in-out",
        fadeIn: "fadeIn 150ms"
      },
    },
  },
  plugins: [],
};
