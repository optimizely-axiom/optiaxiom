import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";

type MenuButtonProps = ComponentPropsWithoutRef<typeof Button>;

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button
        icon={<IconAngleDown />}
        iconPosition="end"
        justifyContent="space-between"
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

MenuButton.displayName = "@optiaxiom/react/MenuButton";
