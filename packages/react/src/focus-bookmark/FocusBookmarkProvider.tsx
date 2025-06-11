import { type ReactNode, type RefObject, useEffect, useRef } from "react";

import { FocusBookmarkProviderProvider } from "./FocusBookmarkProviderContext";

const BOOKMARK_LIMIT = 5;

export type FocusBookmarkProviderProps = {
  children?: ReactNode;
  /**
   * Restrict bookmark capturing to given container.
   */
  containerRef?: RefObject<HTMLElement>;
};

export function FocusBookmarkProvider({
  children,
  containerRef,
}: FocusBookmarkProviderProps) {
  const bookmarksRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const container = containerRef?.current ?? document.body;

    const listener = (event: FocusEvent) => {
      if (
        "preventFocusBookmarkDefault" in event &&
        event.preventFocusBookmarkDefault
      ) {
        return;
      }

      if (event.target instanceof HTMLElement) {
        Object.assign(event, { preventFocusBookmarkDefault: true });

        if (bookmarksRef.current.includes(event.target)) {
          bookmarksRef.current = bookmarksRef.current.filter(
            (element) => element !== event.target,
          );
        }
        bookmarksRef.current.push(event.target);

        if (bookmarksRef.current.length > BOOKMARK_LIMIT) {
          bookmarksRef.current.shift();
        }
      }
    };
    container.addEventListener("focusin", listener);
    return () => container.removeEventListener("focusin", listener);
  }, [containerRef]);

  return (
    <FocusBookmarkProviderProvider bookmarksRef={bookmarksRef}>
      {children}
    </FocusBookmarkProviderProvider>
  );
}

FocusBookmarkProvider.displayName = "@optiaxiom/react/FocusBookmarkProvider";
