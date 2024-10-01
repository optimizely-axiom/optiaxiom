import * as RadixSegmentedControl from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type SegmentedControlItemProps = ButtonProps<typeof RadixSegmentedControl.Item>;

export const SegmentedControlItem = forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ children, value, ...props }, ref) => {
  return (
    <RadixSegmentedControl.Item asChild ref={ref} value={value}>
      <Button appearance="secondary" {...props}>
        {children}
      </Button>
    </RadixSegmentedControl.Item>
  );
});

SegmentedControlItem.displayName = "@optiaxiom/react/SegmentedControlItem";
