import { ToggleGroup } from "radix-ui";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { useSegmentedControlContext } from "./SegmentedControlContext";

type SegmentedControlItemProps = ButtonProps<typeof ToggleGroup.Item>;

export const SegmentedControlItem = forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ children, ...props }, ref) => {
  useSegmentedControlContext("@optiaxiom/react/SegmentedControlItem");

  return (
    <ToggleGroup.Item appearance="subtle" asChild ref={ref} {...props}>
      <Button>{children}</Button>
    </ToggleGroup.Item>
  );
});

SegmentedControlItem.displayName = "@optiaxiom/react/SegmentedControlItem";
