import { useState, useCallback } from 'react';

function usePreventDoubleClick<T extends (...args: any[]) => void>(callback: T, delay = 300) {
  const [isClicked, setIsClicked] = useState(false);

  return useCallback(
    (...args: Parameters<T>): void => {
      if (!isClicked) {
        callback(...args);
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), delay);
      }
    },
    [isClicked, callback, delay]
  );
}

export default usePreventDoubleClick;
