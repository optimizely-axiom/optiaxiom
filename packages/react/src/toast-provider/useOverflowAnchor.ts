import { type RefObject, useEffect, useRef, useState } from "react";

export const useOverflowAnchor = (
  scrollingElementRef: RefObject<HTMLElement>,
  scrollAnchor: "bottom" | "top",
) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const previousScrollAnchor = useRef<"bottom" | "top" | null>(scrollAnchor);
  useEffect(() => {
    previousScrollAnchor.current = scrollAnchor;
  }, [scrollAnchor]);

  useEffect(() => {
    if (!scrollingElementRef.current) {
      return;
    }

    const element = scrollingElementRef.current;
    const listener = () =>
      (previousScrollAnchor.current =
        Math.ceil(Math.abs(element.scrollTop)) ===
        element.scrollHeight - element.offsetHeight
          ? scrollAnchor
          : null);

    element.addEventListener("scroll", listener);
    return () => element.removeEventListener("scroll", listener);
  }, [mounted, scrollAnchor, scrollingElementRef]);

  useEffect(() => {
    if (!scrollingElementRef.current) {
      return;
    }

    const element = scrollingElementRef.current;
    const mutation = new MutationObserver(() => {
      if (previousScrollAnchor.current === scrollAnchor) {
        element.scrollTop =
          (scrollAnchor === "top" ? -1 : 1) * element.scrollHeight -
          element.offsetHeight;
      }
    });

    mutation.observe(element, { childList: true });
    return () => mutation.disconnect();
  }, [mounted, scrollAnchor, scrollingElementRef]);
};
