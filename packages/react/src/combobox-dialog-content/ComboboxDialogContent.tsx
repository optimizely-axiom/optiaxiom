import * as RadixDialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuListbox } from "../menu-listbox";
import type { ExcludeProps } from "../utils";

import { DialogContent } from "../dialog-content";

type ComboboxDialogContentProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof DialogContent> &
    Pick<ComponentPropsWithoutRef<typeof MenuListbox>, "maxH" | "minW">,
  "size"
>;

export const ComboboxDialogContent = forwardRef<
  HTMLDivElement,
  ComboboxDialogContentProps
>(({ "aria-label": ariaLabel, children, minW: _minW, ...props }, ref) => {
  return (
    <DialogContent ref={ref} {...props}>
      <VisuallyHidden>
        <RadixDialog.Title>{ariaLabel}</RadixDialog.Title>
      </VisuallyHidden>

      {children}
    </DialogContent>
  );
});

ComboboxDialogContent.displayName = "@optiaxiom/react/ComboboxDialogContent";
