import { type ReactNode, type RefObject, useEffect, useRef } from "react";

import {
  FocusBookmarkProviderProvider,
  useFocusBookmarkProviderContext,
} from "./FocusBookmarkProviderContext";
import { focusBookmarks } from "./focusBookmarks";

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
  const { depth } = useFocusBookmarkProviderContext(
    "@optiaxiom/react/FocusBookmarkProvider",
  );
  const bookmarksRef = useRef<HTMLElement[]>([]);

  const layerRef =
    useRef<ReturnType<NonNullable<typeof focusBookmarks>["add"]>>();
  // Separate from the listener effect so a new containerRef keeps the layer's
  // bookmarks.
  useEffect(() => {
    if (!focusBookmarks) {
      return;
    }

    const layer = focusBookmarks.add(depth);
    layerRef.current = layer;
    return () => {
      layer.remove();
      layerRef.current = undefined;
    };
  }, [depth]);

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

        if (layerRef.current) {
          layerRef.current.record(event.target);
          return;
        }

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
    <FocusBookmarkProviderProvider
      bookmarksRef={bookmarksRef}
      depth={depth + 1}
    >
      {children}
    </FocusBookmarkProviderProvider>
  );
}

FocusBookmarkProvider.displayName = "@optiaxiom/react/FocusBookmarkProvider";
