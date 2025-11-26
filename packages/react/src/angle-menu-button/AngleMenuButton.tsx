import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";

export type AngleMenuButtonProps = ComponentPropsWithoutRef<typeof Button>;

/**
 * Button with trailing chevron icon for opening dropdowns and popovers.
 *
 * For Menu dropdowns, MenuTrigger uses this component automatically. For other
 * dropdown patterns (like Popover), use AngleMenuButton as the trigger.
 *
 * @group Button
 */
export const AngleMenuButton = forwardRef<
  HTMLButtonElement,
  AngleMenuButtonProps
>(({ children, ...props }, ref) => {
  return (
    <Button icon={<IconAngleDown />} iconPosition="end" ref={ref} {...props}>
      {children}
    </Button>
  );
});

AngleMenuButton.displayName = "@optiaxiom/react/AngleMenuButton";
