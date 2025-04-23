import { ToggleGroup } from "radix-ui";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SegmentedControlProvider } from "./SegmentedControlContext";

type SegmentedControlProps = BoxProps<
  typeof ToggleGroup.Root,
  {
    type?: "multiple" | "single";
  }
>;

export const SegmentedControl = forwardRef<
  HTMLDivElement,
  SegmentedControlProps
>(({ children, type = "single", ...props }, ref) => {
  return (
    <Flex asChild flexDirection="row" gap="0" {...props}>
      <ToggleGroup.Root ref={ref} type={type}>
        <SegmentedControlProvider>{children}</SegmentedControlProvider>
      </ToggleGroup.Root>
    </Flex>
  );
});

SegmentedControl.displayName = "@optiaxiom/react/SegmentedControl";
