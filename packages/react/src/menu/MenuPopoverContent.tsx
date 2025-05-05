import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "./MenuContent";

import { PopoverContent } from "../popover";

export type MenuPopoverContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuPopoverContent = forwardRef<
  HTMLDivElement,
  MenuPopoverContentProps
>((props, ref) => {
  return <PopoverContent maxH="sm" minW="trigger" ref={ref} {...props} />;
});

MenuPopoverContent.displayName = "@optiaxiom/react/MenuPopoverContent";
