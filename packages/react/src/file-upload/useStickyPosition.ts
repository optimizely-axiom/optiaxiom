import { type RefObject, useEffect } from "react";

import { useFileUploadContext } from "./FileUploadContext";

export const useStickyPosition = (
  ref: RefObject<HTMLDivElement>,
  visible: boolean | undefined,
) => {
  const { rootRef } = useFileUploadContext(
    "@optiaxiom/react/useStickyPosition",
  );
  useEffect(() => {
    if (!visible || !rootRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (!rootRef.current || !ref.current) {
        return;
      }

      const entry = entries[0];
      if (!entry.isIntersecting) {
        return;
      }

      const { height, top } = entries[0].intersectionRect;
      const rootRect = rootRef.current.getBoundingClientRect();
      ref.current.style.maxHeight = `${Math.max(108, height)}px`;
      ref.current.style.top = `${top - rootRect.top}px`;
    });
    observer.observe(rootRef.current);

    let timer = 0;
    const listener = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (rootRef.current) {
          observer.unobserve(rootRef.current);
          observer.observe(rootRef.current);
        }
      }, 300);
    };
    window.addEventListener("scroll", listener, true);

    return () => {
      window.removeEventListener("scroll", listener, true);
      observer.disconnect();
    };
  }, [visible, rootRef, ref]);
};
