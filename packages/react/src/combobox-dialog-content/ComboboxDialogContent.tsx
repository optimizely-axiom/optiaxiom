import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ComboboxContent } from "../combobox-content";

import { DialogContent } from "../dialog-content";
import { DialogHeader } from "../dialog-header";

type ComboboxDialogContentProps = ComponentPropsWithoutRef<
  typeof ComboboxContent
>;

export const ComboboxDialogContent = forwardRef<
  HTMLDivElement,
  ComboboxDialogContentProps
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

ComboboxDialogContent.displayName = "@optiaxiom/react/ComboboxDialogContent";
