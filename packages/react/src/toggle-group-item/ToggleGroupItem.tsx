import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type ToggleGroupItemProps = ButtonProps<typeof RadixToggleGroup.Item>;

export const ToggleGroupItem = forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(({ children, value, ...props }, ref) => {
  return (
    <Button appearance="secondary" asChild {...props}>
      <RadixToggleGroup.Item ref={ref} value={value}>
        {children}
      </RadixToggleGroup.Item>
    </Button>
  );
});

ToggleGroupItem.displayName = "@optiaxiom/react/ToggleGroupItem";
