/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray01: "#474747",
        gray02: "#F3F3F4",
        gray03: "#CFD0D2",
        blue01: "13326E",
        blue02: "386FD9",
        blue03: "001744",
        blue04: "DDE6FF",
        blue05: "334D99",
        blue06: "B3C7E6",
        blue07: "3E5C9A",
        blue09: "C2D9FF",
        game_blue01: "#0060F0",
        black01: "#070707",
        white: "#FBFBFB",
      },
      fontFamily: {
        SofiaSans: ["Sofia Sans"], //기본 폰트
      },
      animation: {
        "ping-long": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
