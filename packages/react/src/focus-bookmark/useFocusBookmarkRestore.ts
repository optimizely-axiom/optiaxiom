import { useCallback } from "react";

import { useFocusBookmarkProviderContext } from "./FocusBookmarkProviderContext";

/**
 * Returns a stable function that focuses the most recent bookmarked element
 * that can take focus, and reports whether one did. It only closes over the
 * provider's ref, so it keeps working after the calling component unmounts.
 */
export function useFocusBookmarkRestore(consumerName: string) {
  const { bookmarksRef } = useFocusBookmarkProviderContext(consumerName);

  return useCallback(() => {
    bookmarksRef.current = bookmarksRef.current.filter((element) =>
      document.body.contains(element),
    );
    while (bookmarksRef.current.length) {
      const element = bookmarksRef.current.pop();
      element?.focus();
      if (document.activeElement === element) {
        return true;
      }
    }
    return false;
  }, [bookmarksRef]);
}
