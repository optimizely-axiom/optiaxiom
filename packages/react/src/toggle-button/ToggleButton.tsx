import * as RadixToggle from "@radix-ui/react-toggle";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

export type ToggleButtonProps = ButtonProps<
  typeof RadixToggle.Root,
  {
    /**
     * Control the appearance by selecting between the different button types.
     */
    appearance?: "default" | "subtle";
  }
>;

/**
 * `ToggleButton` component represents a button that can be toggled on or off.
 *
 * @since 0.1.0
 * @extends Button
 */
export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button asChild {...props}>
        <RadixToggle.Root ref={ref}>{children}</RadixToggle.Root>
      </Button>
    );
  },
);

ToggleButton.displayName = "@optiaxiom/react/ToggleButton";
