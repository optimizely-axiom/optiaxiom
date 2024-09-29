import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type ToggleGroupProps = BoxProps<typeof RadixToggleGroup.Root>;

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ children, type = "single", ...props }, ref) => {
    return (
      <Box asChild {...props}>
        <RadixToggleGroup.Root ref={ref} type={type}>
          {children}
        </RadixToggleGroup.Root>
      </Box>
    );
  },
);

ToggleGroup.displayName = "@optiaxiom/react/ToggleGroup";
