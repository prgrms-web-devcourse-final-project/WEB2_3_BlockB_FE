import { useEffect, useRef } from "react";

import { gsap } from "gsap";

export function useWaveAnimation(isWaiting: boolean) {
  const waveRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (waveRefs.current.length === 0) return;

    gsap.killTweensOf(waveRefs.current);

    if (isWaiting) {
      const duration = 2;
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.2 });

      waveRefs.current.forEach((wave, index) => {
        tl.to(
          wave,
          {
            scale: 2 + index,
            opacity: 0,
            duration: duration - index * 0.5,
            ease: "power2.out",
          },
          0
        );
      });
    } else {
      waveRefs.current.forEach((wave) => {
        gsap.set(wave, { scale: 1, opacity: 1 });
      });
    }
  }, [isWaiting]);

  return waveRefs;
}
