import { useEffect, useMemo, useState } from "react";

import { useLocation } from "react-router";

export default function TopButton() {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [hover, setHover] = useState(false);

  const topBtnColor = pathname === "/" ? "#FBFBFB" : "#474747";

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hoverStyle = useMemo(() => {
    if (!hover) return topBtnColor;
    return topBtnColor === "#FBFBFB" ? "#0060F0" : "#CFD0D2";
  }, [hover, topBtnColor]);

  if (!showButton) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="fixed bottom-10 right-10 cursor-pointer group transition-all duration-300 ease-in-out"
    >
      <svg
        width="42"
        height="43"
        viewBox="0 0 42 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 ease-in-out"
      >
        <path
          d="M21 41.5332C32.046 41.5332 41 32.5792 41 21.5332C41 10.4872 32.046 1.5332 21 1.5332C9.954 1.5332 1 10.4872 1 21.5332C1 32.5792 9.954 41.5332 21 41.5332Z"
          stroke={hoverStyle}
          strokeWidth="2"
        />
        <path
          d="M30.001 24.5332L21.001 15.5332L12.001 24.5332"
          stroke={hoverStyle}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
