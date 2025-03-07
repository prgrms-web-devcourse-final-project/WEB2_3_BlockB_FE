import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LandingLetter() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current,
      { opacity: 0, x: -50 }, 
      {
        opacity: 1,
        x: 0,
        duration: 0.5, 
        delay: 0.7, // 0.7초 후 시작
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div ref={textRef} className="font-sofiaSans lg:h-[480px] md:h-[400px] sm-[360px] h-[200px] flex flex-col justify-center z-50 sm:text-left text-center">
      <p className="font-bold text-[60px] w-[460px] max-xl:text-[50px] max-lg:text-[40px] max-xl:w-[380px] max-lg:w-80  max-md:text-[30px] max-md:w-64">
        Sharing Thoughts Not Just Words
      </p>
      <p className="text-[40px] text-gray02 max-xl:text-[30px] max-md:text-[20px]">
        Think Deep, Speak Clear
      </p>
    </div>
  );
}
