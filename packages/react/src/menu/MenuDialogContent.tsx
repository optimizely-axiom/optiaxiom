import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "./MenuContent";

import { DialogContent, DialogHeader } from "../dialog";
import { VisuallyHidden } from "../visually-hidden";

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
      side: _side,
      sideOffset: _sideOffset,
      ...props
    },
    ref,
  ) => {
    return (
      <DialogContent ref={ref} transitionType="pop" {...props}>
        {children}

        <VisuallyHidden tabIndex={-1}>
          <DialogHeader>{ariaLabel}</DialogHeader>
        </VisuallyHidden>
      </DialogContent>
    );
  },
);

MenuDialogContent.displayName = "@optiaxiom/react/MenuDialogContent";
