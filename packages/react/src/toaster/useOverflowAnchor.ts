import { type RefObject, useLayoutEffect, useRef } from "react";

export const useOverflowAnchor = (
  scrollingElementRef: RefObject<HTMLElement>,
  scrollAnchor: "bottom" | "top",
) => {
  const previousScrollAnchor = useRef<"bottom" | "top" | null>(scrollAnchor);
  useLayoutEffect(() => {
    previousScrollAnchor.current = scrollAnchor;
  }, [scrollAnchor]);

  useLayoutEffect(() => {
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
  }, [scrollAnchor, scrollingElementRef]);

  useLayoutEffect(() => {
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
  }, [scrollAnchor, scrollingElementRef]);
};
