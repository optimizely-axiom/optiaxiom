import * as RadixSegmentedControl from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";

type SegmentedControlItemProps = ButtonProps<typeof RadixSegmentedControl.Item>;

export const SegmentedControlItem = forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ children, ...props }, ref) => {
  return (
    <RadixSegmentedControl.Item
      appearance="secondary"
      asChild
      ref={ref}
      {...props}
    >
      <Button>{children}</Button>
    </RadixSegmentedControl.Item>
  );
});

SegmentedControlItem.displayName = "@optiaxiom/react/SegmentedControlItem";
