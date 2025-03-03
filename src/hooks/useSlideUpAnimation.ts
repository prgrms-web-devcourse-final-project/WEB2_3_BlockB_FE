import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';

function useSlideUpAnimation(containerRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // 전체 컴포넌트 슬라이드업 + 페이드 인
      gsap.from(container, {
        opacity: 0,
        y: 100,
        duration: 0.2,
        ease: 'power4.out',
        onComplete: () => {
          gsap.to(container, { opacity: 1, y: 0 });
        },
      });

      // 내부 요소들이 차례대로 애니메이션
      gsap.from(container.children, {
        opacity: 0,
        y: 20,
        stagger: 0.1, // 각 요소 0.1초 간격
        duration: 0.4,
        ease: 'power3.out', // 부드러운 애니메이션
        onComplete: () => {
          gsap.to(container.children, { opacity: 1, y: 0 });
        },
      });
    }
  }, [containerRef]);
}

export default useSlideUpAnimation;
