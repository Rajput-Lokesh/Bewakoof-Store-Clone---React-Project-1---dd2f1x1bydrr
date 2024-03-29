/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: {
      1: "8px",
      2: "120px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "48px",
    },
    colors: {
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      Lokesh: "blue",
    },
  },
  plugins: [],
};
