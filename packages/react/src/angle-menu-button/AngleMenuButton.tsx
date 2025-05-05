import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";

export type AngleMenuButtonProps = ComponentPropsWithoutRef<typeof Button>;

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
