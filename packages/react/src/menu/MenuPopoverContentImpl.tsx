import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { usePopoverContentContext } from "../popover/internals";

export type MenuPopoverContentImplProps = BoxProps;

export const MenuPopoverContentImpl = forwardRef<
  HTMLDivElement,
  MenuPopoverContentImplProps
>(({ children, ...props }, outerRef) => {
  const { side } = usePopoverContentContext(
    "@optiaxiom/react/MenuPopoverContentImpl",
  );

  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);

  useEffect(() => {
    if (!innerRef.current || side !== "top") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      if (!innerRef.current) {
        return;
      }

      for (const entry of entries) {
        innerRef.current.style.minHeight = `${entry.borderBoxSize[0].blockSize}px`;
      }
    });

    observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, [side]);

  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

MenuPopoverContentImpl.displayName = "@optiaxiom/react/MenuPopoverContentImpl";
