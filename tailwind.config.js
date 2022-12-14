/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        album: `0px 0px 1.7px rgba(0, 0, 0, 0.069),
  0px 0px 5.6px rgba(0, 0, 0, 0.101),
  0px 0px 25px rgba(0, 0, 0, 0.17)`,
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ["Bebas Neue", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(300%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        loading: "loading 0.5s ease-in-out infinite",
      },
      colors: {
        "c-teal": {
          50: "#f6fcfe",
          100: "#edfafe",
          200: "#d2f2fb",
          300: "#b7e9f9",
          400: "#82d9f5",
          500: "#4cc9f0",
          600: "#44b5d8",
          700: "#3997b4",
          800: "#2e7990",
          900: "#256276",
        },
        "c-blue": {
          50: "#f6f7fe",
          100: "#eceffd",
          200: "#d0d8fb",
          300: "#b4c0f8",
          400: "#7b90f3",
          500: "#4361ee",
          600: "#3c57d6",
          700: "#3249b3",
          800: "#283a8f",
          900: "#213075",
        },
        "c-indigo": {
          50: "#f5f3fa",
          100: "#ebe7f6",
          200: "#cec2e8",
          300: "#b09eda",
          400: "#7555bf",
          500: "#3a0ca3",
          600: "#340b93",
          700: "#2c097a",
          800: "#230762",
          900: "#1c0650",
        },
        "c-purple": {
          50: "#f8f3fb",
          100: "#f1e6f8",
          200: "#dcc2ed",
          300: "#c79de2",
          400: "#9c53cd",
          500: "#7209b7",
          600: "#6708a5",
          700: "#560789",
          800: "#44056e",
          900: "#38045a",
        },
        "c-pink": {
          50: "#fff4f9",
          100: "#fee9f3",
          200: "#fdc9e1",
          300: "#fca8ce",
          400: "#f966aa",
          500: "#f72585",
          600: "#de2178",
          700: "#b91c64",
          800: "#941650",
          900: "#791241",
        },
      },
    },
  },
  daisyui: {
    themes: ["dracula", "cupcake"],
  },
  plugins: [require("daisyui")],
};
