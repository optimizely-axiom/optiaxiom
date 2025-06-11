import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import { useFocusBookmarkProviderContext } from "./FocusBookmarkProviderContext";

export type FocusBookmarkRestoreProps = ComponentPropsWithoutRef<"button">;

export const FocusBookmarkRestore = forwardRef<
  {
    contains: () => boolean;
    focus: () => void;
  },
  FocusBookmarkRestoreProps
>((_props, ref) => {
  const { bookmarksRef } = useFocusBookmarkProviderContext(
    "@optiaxiom/react/FocusBookmarkRestore",
  );

  useImperativeHandle(
    ref,
    () => ({
      contains: () => false,
      focus: () => {
        bookmarksRef.current = bookmarksRef.current.filter((element) =>
          document.body.contains(element),
        );
        while (bookmarksRef.current.length) {
          const element = bookmarksRef.current.pop();
          if (!element) {
            break;
          }

          element.focus();
          break;
        }
      },
    }),
    [bookmarksRef],
  );

  return null;
});

FocusBookmarkRestore.displayName = "@optiaxiom/react/FocusBookmarkRestore";
