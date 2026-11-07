"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Returns a `requestAnimationFrame` that runs `callback` after `frames` paints
 * and returns a cancel function. A pending callback is cancelled when the
 * component unmounts, so it never sets state on an unmounted tree (in tests,
 * after the environment is torn down).
 */
export function useAnimationFrame() {
  const frameRef = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  return useCallback((callback: () => void, frames = 1) => {
    const tick = (remaining: number) => {
      frameRef.current = requestAnimationFrame(() =>
        remaining > 1 ? tick(remaining - 1) : callback(),
      );
    };
    tick(frames);

    return () => cancelAnimationFrame(frameRef.current);
  }, []);
}
