import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type PopoverProps = BoxProps<typeof RadixPopover.Root>;

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex asChild ref={ref} {...props}>
        <RadixPopover.Root>
          <RadixPopover.Anchor />
          <RadixPopover.Portal>{children}</RadixPopover.Portal>
        </RadixPopover.Root>
      </Flex>
    );
  },
);

Popover.displayName = "@optiaxiom/react/Popover";
