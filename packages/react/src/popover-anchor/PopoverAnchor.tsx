import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

type PopoverAnchorProps = BoxProps<typeof RadixPopover.Anchor>;

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <Box asChild {...props}>
        <RadixPopover.Anchor asChild={asChild} ref={ref}>
          {children}
        </RadixPopover.Anchor>
      </Box>
    );
  },
);

PopoverAnchor.displayName = "@optiaxiom/react/PopoverAnchor";
