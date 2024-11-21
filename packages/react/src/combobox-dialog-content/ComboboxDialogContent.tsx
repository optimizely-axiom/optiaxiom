import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuListbox } from "../menu-listbox";

import { DialogContent } from "../dialog-content";
import { DialogTitle } from "../dialog-title";

type ComboboxDialogContentProps = {
  minW?: ComponentPropsWithoutRef<typeof MenuListbox>["minW"];
} & ComponentPropsWithoutRef<typeof DialogContent>;

export const ComboboxDialogContent = forwardRef<
  HTMLDivElement,
  ComboboxDialogContentProps
>(({ "aria-label": ariaLabel, children, minW: _minW, ...props }, ref) => {
  return (
    <DialogContent aria-describedby={undefined} ref={ref} {...props}>
      <VisuallyHidden>
        <DialogTitle>{ariaLabel}</DialogTitle>
      </VisuallyHidden>

      {children}
    </DialogContent>
  );
});

ComboboxDialogContent.displayName = "@optiaxiom/react/ComboboxDialogContent";