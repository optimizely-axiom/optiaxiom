import * as RadixDialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { DialogContent } from "../dialog-content";
import { PopoverContent } from "../popover-content";

type SpotlightContentProps = ComponentPropsWithoutRef<
  typeof DialogContent | typeof PopoverContent
>;

export const SpotlightContent = forwardRef<
  HTMLDivElement,
  SpotlightContentProps
>(({ "aria-label": ariaLabel, children, size: _size, ...props }, ref) => {
  return (
    <DialogContent
      gap="0"
      overflow="hidden"
      pb="24"
      ref={ref}
      transitionType="pop"
      {...props}
    >
      <VisuallyHidden>
        <RadixDialog.Title>{ariaLabel ?? "Quick search"}</RadixDialog.Title>
      </VisuallyHidden>

      {children}
    </DialogContent>
  );
});

SpotlightContent.displayName = "@optiaxiom/react/SpotlightContent";
