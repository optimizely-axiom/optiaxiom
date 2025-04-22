import * as RadixSegmentedControl from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SegmentedControlProvider } from "./SegmentedControlContext";

type SegmentedControlProps = BoxProps<
  typeof RadixSegmentedControl.Root,
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
      <RadixSegmentedControl.Root ref={ref} type={type}>
        <SegmentedControlProvider>{children}</SegmentedControlProvider>
      </RadixSegmentedControl.Root>
    </Flex>
  );
});

SegmentedControl.displayName = "@optiaxiom/react/SegmentedControl";
