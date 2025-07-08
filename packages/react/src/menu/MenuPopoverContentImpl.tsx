import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef } from "react";

import { Box, type BoxProps } from "../box";

export type MenuPopoverContentImplProps = BoxProps;

export const MenuPopoverContentImpl = forwardRef<
  HTMLDivElement,
  MenuPopoverContentImplProps
>(({ children, ...props }, outerRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);

  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

MenuPopoverContentImpl.displayName = "@optiaxiom/react/MenuPopoverContentImpl";
