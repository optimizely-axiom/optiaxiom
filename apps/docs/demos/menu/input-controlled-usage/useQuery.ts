import { useCallback, useEffect, useRef, useState } from "react";

export const useQuery = <
  T extends (...args: [inputValue: string]) => ReturnType<T>,
>(
  fetchFn: T,
) => {
  const [data, setData] = useState<ReturnType<T>>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchRef = useRef(fetchFn);
  fetchRef.current = fetchFn;

  const timerRef = useRef<number>();

  const refetch = useCallback((...args: [inputValue: string]) => {
    setIsLoading(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setData(fetchRef.current(...args));
      setIsLoading(false);
    }, 600);
  }, []);

  useEffect(() => {
    refetch("");
  }, [refetch]);

  return { data, isLoading, refetch };
};
