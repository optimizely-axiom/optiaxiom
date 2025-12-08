import * as RadixSegmentedControl from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { SegmentedControlProvider } from "./SegmentedControlContext";

export type SegmentedControlProps = BoxProps<
  typeof RadixSegmentedControl.Root,
  {
    /**
     * Whether to allow multiple values or only activate one item at a time.
     */
    type?: "multiple" | "single";
  }
>;

/**
 * Toggle buttons for switching between different values or views.
 *
 * @group SegmentedControl
 * @category actions
 * @category form
 * @since 0.2.0
 */
export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ children, type = "single", ...props }, ref) => {
  return (
    <Group asChild gap="0" {...props}>
      <RadixSegmentedControl.Root ref={ref} type={type}>
        <SegmentedControlProvider>{children}</SegmentedControlProvider>
      </RadixSegmentedControl.Root>
    </Group>
  );
});

SegmentedControl.displayName = "@optiaxiom/react/SegmentedControl";
