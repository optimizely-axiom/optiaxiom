import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { extractSprinkles } from "../sprinkles";

type PopoverTriggerProps = BoxProps<typeof RadixPopover.Trigger>;

export const PopoverTrigger = forwardRef<HTMLDivElement, PopoverTriggerProps>(
  ({ children, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    return (
      <Flex alignItems="center" asChild ref={ref} {...sprinkleProps}>
        <RadixPopover.Trigger asChild {...restProps}>
          {children}
        </RadixPopover.Trigger>
      </Flex>
    );
  },
);

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
