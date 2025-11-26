import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconEllipsisSolid } from "../icons/IconEllipsisSolid";

export type EllipsisMenuButtonProps = ComponentPropsWithoutRef<typeof Button>;

/**
 * Button with ellipsis icon for opening overflow menus and dropdowns.
 *
 * Use with MenuTrigger asChild for overflow menus.
 *
 * @example
 * <MenuTrigger asChild><EllipsisMenuButton /></MenuTrigger>
 *
 * @group Button
 */
export const EllipsisMenuButton = forwardRef<
  HTMLButtonElement,
  EllipsisMenuButtonProps
>(({ children, ...props }, ref) => {
  return (
    <Button
      icon={<IconEllipsisSolid />}
      iconPosition="end"
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});

EllipsisMenuButton.displayName = "@optiaxiom/react/EllipsisMenuButton";
