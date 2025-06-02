import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "./MenuContent";

import { PopoverContent } from "../popover";
import { MenuPopoverContentImpl } from "./MenuPopoverContentImpl";

export type MenuPopoverContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuPopoverContent = forwardRef<
  HTMLDivElement,
  MenuPopoverContentProps
>(({ children, ...props }, ref) => {
  return (
    <PopoverContent asChild ref={ref} {...props}>
      <MenuPopoverContentImpl>{children}</MenuPopoverContentImpl>
    </PopoverContent>
  );
});

MenuPopoverContent.displayName = "@optiaxiom/react/MenuPopoverContent";
