/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    maxWidth: {
      xs: "450px",
      xl: "1240px",
    },
    fontSize: {
      "3xs": ["12px", "15px"],
      xxs: ["15px", "18px"],
      xs: ["18px", "22px"],
      sm: ["18px", "25px"],
      base: ["23px", "28px"],
      "base-2": ["23px", "32px"],
      md: ["29px", "35px"],
      lg: ["36px", "45px"],
      xlg: ["46px", "57px"],
    },
    borderRadius: {
      1: "1px",
      3: "3px",
      5: "5px",
      10: "10px",
      15: "15px",
      20: "20px",
      25: "15px",
      30: "30px",
    },
    extend: {},
  },
  plugins: [],
}

