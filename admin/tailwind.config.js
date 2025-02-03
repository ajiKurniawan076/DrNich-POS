/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        SFPro: ["SF Pro Display", "sans-serif"],
      },
      colors: {
        primary: "#00674F",
        secondary: "#C2A353",
        info: "#2F80ED",
        success: "#27AE60",
        error: "#EB5757",
        warning: "#E2B93B",
        text: "#464646",
        "disable-text": "#BDBDBD",
        "disable-line": "#EFEFEF",
        "disable-button": "#EFEFEF",
      },
    },
  },
};
