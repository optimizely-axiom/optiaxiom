import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type ToggleGroupProps = BoxProps<typeof RadixToggleGroup.Root>;

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ children, type = "single", ...props }, ref) => {
    return (
      <Flex asChild flexDirection="row" gap="0" {...props}>
        <RadixToggleGroup.Root ref={ref} type={type}>
          {children}
        </RadixToggleGroup.Root>
      </Flex>
    );
  },
);

ToggleGroup.displayName = "@optiaxiom/react/ToggleGroup";
