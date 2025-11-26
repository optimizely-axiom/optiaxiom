import * as RadixSegmentedControl from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { useSegmentedControlContext } from "./SegmentedControlContext";

export type SegmentedControlItemProps = ButtonProps<
  typeof RadixSegmentedControl.Item
>;

/**
 * @group SegmentedControl
 * @extends Button
 */
export const SegmentedControlItem = forwardRef<
  HTMLButtonElement,
  SegmentedControlItemProps
>(({ asChild, children, ...props }, ref) => {
  useSegmentedControlContext("@optiaxiom/react/SegmentedControlItem");

  return (
    <RadixSegmentedControl.Item
      appearance="subtle"
      asChild
      ref={ref}
      {...props}
    >
      <Button asChild={asChild}>{children}</Button>
    </RadixSegmentedControl.Item>
  );
});

SegmentedControlItem.displayName = "@optiaxiom/react/SegmentedControlItem";
