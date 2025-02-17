import theme from "@material-tailwind/react/theme";
import withMT from "@material-tailwind/react/utils/withMT";
import daisyui from "daisyui";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // bg semuanya pokoknye
      backgroundImage: {
        "hero-pattern": "url('/src/assets/bg/bg-1.jpg')",
        "footer-pattern": "url('/src/assets/logo-footer/footerbaru.svg')",
        "footer-pattern-desktop": "url('/src/assets/logo-footer/bgFooter.svg')",
        "bg-filter-mobile": "url('/src/components/bg-filter-mobile.svg')",
      },

      screens: {
        'mobile-300': '300px', // Custom screen size for 300px
      },


      boxShadow: {
        "inner-shadow": "inset 0 0 10px 0 rgba(255, 255, 255, 0.5)",
      },
      ShadowRoot: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        myShadow:
          "0px 8px 12px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.30)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
      },
      fontFamily: {
        SFPro: ["SF Pro Display", "Helvetica"],
        Cabin: ["Cabin", "sans-serif"],
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
  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    darkTheme: false,
  },
});
