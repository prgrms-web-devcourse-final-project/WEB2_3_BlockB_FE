/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray01: "#474747",
        gray02: "#F3F3F4",
        gray03: "#CFD0D2",
        gray04: "#BABABA",
        blue01: "#13326E",
        blue02: "#386FD9",
        blue03: "#001744",
        blue04: "#DDE6FF",
        blue05: "#334D99",
        blue06: "#B3C7E6",
        blue07: "#3E5C9A",
        blue09: "#C2D9FF",
        game_blue01: "#0060F0",
        black01: "#070707",
        white: "#FBFBFB",
        white02: "EEEDED",
      },
      fontFamily: {
        sofiaSans: ["Sofia Sans"], //기본 폰트
        unifrakturCook: ["UnifrakturCook"],
        sourceSerif4: ["Source Serif 4"],
        timmana: ["Timmana"],
        jersey: ["Jersey"],
        pretendard: ["Pretendard"],
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(0%)", opacity: "0" },
          "100%": { transform: "translateY(-100)", opacity: "1" },
        },
        fadeScale: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        flip: {
          "0%": { transform: "rotateX(90deg)", opacity: "0" },
          "100%": { transform: "rotateX(0)", opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" },
        },
        fadeSlideIn: {
          "0%": { opacity: "0", transform: "translateX(20%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeSlideOut: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(20%)" },
        },
      },
      animation: {
        "ping-long": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "slide-down": "slideDown 1s ease-out",
        "slide-up": "slideUp 2s ease-in-out",
        "slide-up-fast": "slideUp 1s ease-in-out",
        "fade-scale": "fadeScale 0.3s ease-out",
        spin: "spin 3s linear infinite",
        flip: "flip 0.7s ease-out",
        slideIn: "slideIn 0.3s ease-out forwards",
        slideOut: "slideOut 0.3s ease-in forwards",
        fadeSlideIn: "fadeSlideIn 0.3s ease-out forwards",
        fadeSlideOut: "fadeSlideOut 0.3s ease-in forwards",
      },
      boxShadow: {
        "game-blue": "0 1px 10px rgba(29, 78, 216, 0.5)",
      },
    },
  },
  plugins: [],
};
