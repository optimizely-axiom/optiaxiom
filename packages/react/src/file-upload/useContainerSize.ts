import { type RefObject, useEffect, useState } from "react";

export const useContainerSize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState<number>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (!ref.current) {
        return;
      }

      for (const entry of entries) {
        setSize(entry.borderBoxSize[0].blockSize);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
};
