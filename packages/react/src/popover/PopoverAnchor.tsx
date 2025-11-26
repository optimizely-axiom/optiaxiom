import * as RadixPopper from "@radix-ui/react-popper";
import { forwardRef, type RefObject, useEffect, useState } from "react";

import { Box, type BoxProps } from "../box";
import { usePopoverContext } from "./PopoverContext";
import { usePopoverScope } from "./usePopoverScope";

export type PopoverAnchorProps = BoxProps<
  typeof RadixPopper.Anchor,
  {
    /**
     * Use a static virtual ref to anchor the content instead of updating the
     * position on layout shift/scroll.
     */
    staticRef?: RefObject<HTMLElement>;
  }
>;

/**
 * @group Popover
 */
export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ asChild, children, staticRef, ...props }, ref) => {
    const { __scopePopover } = usePopoverScope(undefined);

    const { open } = usePopoverContext("@optiaxiom/react/PopoverAnchor");

    const [virtualRef, setVirtualRef] = useState<{
      current: null | { getBoundingClientRect(): DOMRect };
    }>({ current: null });
    useEffect(() => {
      if (!staticRef?.current || !open) {
        return;
      }

      const rect = staticRef.current.getBoundingClientRect();
      setVirtualRef({ current: { getBoundingClientRect: () => rect } });
    }, [open, staticRef]);

    return (
      <Box
        asChild
        ref={ref}
        virtualRef={staticRef ? virtualRef : undefined}
        {...props}
        {...{ __scopePopper: __scopePopover }}
      >
        <RadixPopper.Anchor asChild={asChild}>{children}</RadixPopper.Anchor>
      </Box>
    );
  },
);

PopoverAnchor.displayName = "@optiaxiom/react/PopoverAnchor";
