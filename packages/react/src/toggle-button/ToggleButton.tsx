import * as RadixToggle from "@radix-ui/react-toggle";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type ToggleButtonProps = ButtonProps<
  typeof RadixToggle.Root,
  {
    /**
     * Control the appearance by selecting between the different button types.
     */
    appearance?: "default" | "subtle";
  }
>;

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
