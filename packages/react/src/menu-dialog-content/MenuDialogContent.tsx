import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "../menu-content";

import { DialogContent } from "../dialog-content";
import { DialogHeader } from "../dialog-header";

type MenuDialogContentProps = ComponentPropsWithoutRef<typeof MenuContent>;

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
        <VisuallyHidden tabIndex={-1}>
          <DialogHeader>{ariaLabel}</DialogHeader>
        </VisuallyHidden>

        {children}
      </DialogContent>
    );
  },
);

MenuDialogContent.displayName = "@optiaxiom/react/MenuDialogContent";
