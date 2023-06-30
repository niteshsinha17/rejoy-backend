/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#145eeb",
      danger: "#ff0000",
      primaryBoder: "#edeff2",
      white: "#ffffff",
      textSecondary: "#70747d",
      textPrimary: "#0f2d5a",
      green: "#0f866c",
      yellow: "#d4e300",
      black: "#000000",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      manrope: ["Manrope", "sans-serif"],
    },
    screens: {
      xs: "0px",
      sm: "600px",
      md: "960px",
      lg: "1280px",
      xl: "1920px",
    },
    spacing: {
      1: "8px",
      2: "12px",
      3: "16px",
      4: "24px",
      5: "32px",
      6: "48px",
    },
  },
  plugins: [],
};
