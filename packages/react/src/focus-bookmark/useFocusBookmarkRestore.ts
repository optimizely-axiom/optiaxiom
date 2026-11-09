import { useCallback } from "react";

import { useFocusBookmarkProviderContext } from "./FocusBookmarkProviderContext";
import { focusBookmarks } from "./focusBookmarks";

/**
 * Returns a stable function that focuses the most recent bookmarked element
 * that can take focus. It only closes over refs and the page-wide registry, so
 * it keeps working after the calling component unmounts.
 */
export function useFocusBookmarkRestore(consumerName: string) {
  const { bookmarksRef } = useFocusBookmarkProviderContext(consumerName);

  return useCallback(() => {
    if (focusBookmarks) {
      focusBookmarks.restore();
      return;
    }

    bookmarksRef.current = bookmarksRef.current.filter((element) =>
      document.body.contains(element),
    );
    while (bookmarksRef.current.length) {
      const element = bookmarksRef.current.pop();
      element?.focus();
      if (document.activeElement === element) {
        return;
      }
    }
  }, [bookmarksRef]);
}
