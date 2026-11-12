"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns `{ clear, start }` for a single pending timeout. `start` runs
 * `callback` after `delay` ms, replacing any callback still pending. The
 * pending callback is cleared when the component unmounts, so it never sets
 * state on an unmounted tree (in tests, after the environment is torn down).
 */
export function useTimeout() {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const clear = useCallback(() => clearTimeout(timerRef.current), []);
  useEffect(() => clear, [clear]);

  const start = useCallback(
    (callback: () => void, delay?: number) => {
      clear();
      timerRef.current = setTimeout(callback, delay);
    },
    [clear],
  );

  return { clear, start };
}
