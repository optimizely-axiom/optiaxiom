import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
} from "react";

import { useFocusBookmarkRestore } from ".";

export type FocusBookmarkRestoreProps = ComponentPropsWithoutRef<"button">;

export const FocusBookmarkRestore = forwardRef<
  {
    contains: () => boolean;
    focus: () => void;
  },
  FocusBookmarkRestoreProps
>((_props, ref) => {
  const restore = useFocusBookmarkRestore();

  useImperativeHandle(
    ref,
    () => ({
      contains: () => false,
      focus: restore,
    }),
    [restore],
  );

  return null;
});

FocusBookmarkRestore.displayName = "@optiaxiom/react/FocusBookmarkRestore";
