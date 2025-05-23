import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "./MenuContent";

import { DialogContent, DialogHeader } from "../dialog";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./MenuDialogContent.css";

export type MenuDialogContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuDialogContent = forwardRef<
  HTMLDivElement,
  MenuDialogContentProps
>(
  (
    {
      align: _align,
      "aria-label": ariaLabel,
      children,
      className,
      side: _side,
      sideOffset: _sideOffset,
      ...props
    },
    ref,
  ) => {
    return (
      <DialogContent ref={ref} {...styles.content({}, className)} {...props}>
        {children}

        <VisuallyHidden tabIndex={-1}>
          <DialogHeader>{ariaLabel}</DialogHeader>
        </VisuallyHidden>
      </DialogContent>
    );
  },
);

MenuDialogContent.displayName = "@optiaxiom/react/MenuDialogContent";
