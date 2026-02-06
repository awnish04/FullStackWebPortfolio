/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // include all your source files
  theme: {
    fontFamily: {
      primary: ["Playfair Display", "serif"],
      secondary: ["Mulish", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1192px",
    },
    extend: {
      colors: {
        primary: "#0E1112",
        secondary: "#101630",
        grey: "#484B4B",
        accent: "#EEF7F9",
      },
    },
  },
  plugins: [],
};

export default config;
