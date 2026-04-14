"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

export function useEffectEvent<
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(callback: T) {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  return useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []);
}
