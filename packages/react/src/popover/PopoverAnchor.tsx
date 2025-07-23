import * as RadixPopper from "@radix-ui/react-popper";
import { forwardRef, type RefObject, useEffect, useRef } from "react";

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

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ asChild, children, staticRef, ...props }, ref) => {
    const { __scopePopover } = usePopoverScope(undefined);

    const { open, presence } = usePopoverContext(
      "@optiaxiom/react/PopoverAnchor",
    );

    const virtualRef = useRef<null | { getBoundingClientRect(): DOMRect }>(
      null,
    );
    useEffect(() => {
      if (!staticRef?.current || !(open || presence)) {
        return;
      }

      const rect = staticRef.current.getBoundingClientRect();
      virtualRef.current = { getBoundingClientRect: () => rect };
      return () => {
        virtualRef.current = null;
      };
    }, [open, presence, staticRef]);

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
