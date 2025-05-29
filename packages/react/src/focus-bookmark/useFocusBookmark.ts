import { type RefObject, useEffect } from "react";

import { bookmarks } from "./bookmarks";

export const useFocusBookmark = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    bookmarks.current.push(ref);
    return () => {
      bookmarks.current = bookmarks.current.filter(
        (bookmark) => bookmark !== ref,
      );
    };
  }, [ref]);
};
