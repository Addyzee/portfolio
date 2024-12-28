/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "#FFFFFF",
        mainBgprev: "#F8F8F8",
        secondaryBg: "#D9D9D9",
      },
      fontFamily: {
        primary: ["Trebuchet MS", "sans-serif"],
        code: ["monospace", "sans-serif"],
      },
    },
  },

  plugins: [],
};
