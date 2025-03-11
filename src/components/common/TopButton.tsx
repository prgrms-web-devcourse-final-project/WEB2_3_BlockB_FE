import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import type { RefObject } from "react";

interface TopButtonProps {
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

export default function TopButton({ scrollContainerRef }: TopButtonProps) {
  const { pathname } = useLocation();
  const [showButton, setShowButton] = useState(false);
  const [hover, setHover] = useState(false);

  const topBtnColor =
    pathname === "/" || "/debate-zone/new-debate" ? "#FBFBFB" : "#474747";
  const bgColor =
    pathname === "/" || "/debate-zone/new-debate" ? "bg-black" : "bg-white";

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef && scrollContainerRef.current) {
        setShowButton(scrollContainerRef.current.scrollTop > 200);
      } else {
        setShowButton(window.scrollY > 200);
      }
    };

    if (scrollContainerRef && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef]);

  const hoverStyle = useMemo(() => {
    if (!hover) return topBtnColor;
    return topBtnColor === "#FBFBFB" ? "#0060F0" : "#CFD0D2";
  }, [hover, topBtnColor]);

  if (!showButton) return null;

  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        if (scrollContainerRef && scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`fixed bottom-10 right-10 cursor-pointer group transition-all duration-300 ease-in-out ${bgColor} w-13 h-13 rounded-full`}
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
