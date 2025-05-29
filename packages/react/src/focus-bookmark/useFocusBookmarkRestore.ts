import { useEffectEvent } from "../hooks";
import { bookmarks } from "./bookmarks";

export const useFocusBookmarkRestore = () => {
  return useEffectEvent(() => {
    if (!bookmarks.current.length) {
      return;
    }

    bookmarks.current[bookmarks.current.length - 1].current?.focus();
  });
};
