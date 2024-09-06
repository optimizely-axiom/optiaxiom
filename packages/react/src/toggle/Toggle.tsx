import * as RadixToggle from "@radix-ui/react-toggle";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type ToggleProps = ButtonProps<typeof RadixToggle.Root>;

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ children, ...props }, ref) => {
    return (
      <Button appearance="secondary" asChild {...props}>
        <RadixToggle.Root ref={ref}>{children}</RadixToggle.Root>
      </Button>
    );
  },
);

Toggle.displayName = "@optiaxiom/react/Toggle";
