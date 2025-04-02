import { useCallback, useRef, useState } from "react";

export const useQuery = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fetchFn: T,
) => {
  const [data, setData] = useState<ReturnType<T>>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchRef = useRef(fetchFn);
  fetchRef.current = fetchFn;

  const timerRef = useRef<number>();

  const refetch = useCallback((...args: Parameters<T>) => {
    setIsLoading(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setData(fetchRef.current(...args));
      setIsLoading(false);
    }, 600);
  }, []);

  return { data, isLoading, refetch };
};
