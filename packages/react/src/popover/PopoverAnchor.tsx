import * as RadixPopper from "@radix-ui/react-popper";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { usePopoverScope } from "./usePopoverScope";

export type PopoverAnchorProps = BoxProps<typeof RadixPopper.Anchor>;

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ children, ...props }, ref) => {
    const { __scopePopover } = usePopoverScope(undefined);

    return (
      <Box asChild ref={ref} {...props} {...{ __scopePopper: __scopePopover }}>
        <RadixPopper.Anchor>{children}</RadixPopper.Anchor>
      </Box>
    );
  },
);

PopoverAnchor.displayName = "@optiaxiom/react/PopoverAnchor";
