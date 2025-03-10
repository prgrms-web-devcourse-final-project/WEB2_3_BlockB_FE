import React, { useEffect, useState, useRef } from 'react';
import logo from '../../assets/icons/logo.svg'; 
import logoWhite from "../../assets/icons/logo-white.svg"

interface LoadingBarProps {
  isLoading: boolean;
  color?: string;
  speed?: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ isLoading, color, speed }) => {
  const [progress, setProgress] = useState(0);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    let interval: number | undefined;

    if (isLoading && progress < 90) {
      // 로딩 중이고 진행률이 90% 미만일 때
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            window.clearInterval(interval);
            return 90;
          }
          return prev + 1;
        });
      }, speed || 7); // 70ms마다 1%씩 증가
    } else if (!isLoading && progress < 100) {
      // 로딩이 완료되면 진행률을 100%로 설정
      setProgress(100);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isLoading, progress]);

  if (!isLoading && progress === 100) {
    return null; // 로딩이 완료되면 컴포넌트를 렌더링하지 않음
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2">
        {/* 로고 이미지 */}
        <div className="flex justify-center mb-4">
          <img src={color ==="white" ? logoWhite : logo} alt="로고" className="w-16 h-16" />
        </div>
        {/* 진행률 바 */}
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full bg-game_blue01 rounded-full"
            style={{
              width: `${progress}%`,
              transition: 'width 0.05s ease-in-out',
            }}
          ></div>
        </div>
        {/* 진행률 텍스트 */}
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>0%</span>
          <span>{progress}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
