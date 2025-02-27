import { useState, useEffect } from "react";

/**
 * useDebounce - 입력값을 일정 시간 후에만 업데이트하는 커스텀 훅
 * @param value 디바운싱할 값 (입력값 등)
 * @param delay 디바운스 시간 (ms)
 * @returns 디바운싱된 값
 */

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
