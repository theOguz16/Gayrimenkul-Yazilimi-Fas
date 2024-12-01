/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        "theme-main": "#545a64",
        "theme-primary": "#3f4257",
        "body-bg": "#EDF2F6",
        "body-color": "#757f8f",
        "text-color": "#9ca3b2",
        "site-color-green": "#76be36",
        "site-color-dark": "#2c353d",
      },
    },

    container: {
      center: true,

      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1200px",
        "2xl": "1300px",
      },
    },
  },
  plugins: [],
};
