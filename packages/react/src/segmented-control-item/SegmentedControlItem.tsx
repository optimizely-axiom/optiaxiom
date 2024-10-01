import * as RadixSegmentedControl from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type SegmentedControlItemProps = ButtonProps<typeof RadixSegmentedControl.Item>;

export const SegmentedControlItem = forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ children, value, ...props }, ref) => {
  return (
    <Button appearance="secondary" asChild {...props}>
      <RadixSegmentedControl.Item ref={ref} value={value}>
        {children}
      </RadixSegmentedControl.Item>
    </Button>
  );
});

SegmentedControlItem.displayName = "@optiaxiom/react/SegmentedControlItem";
