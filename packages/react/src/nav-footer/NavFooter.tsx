import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type NavFooterProps = BoxProps<"div">;

export const NavFooter = forwardRef<HTMLDivElement, NavFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex gap="8" mt="auto" overflowX="hidden" py="8" ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

NavFooter.displayName = "@optiaxiom/react/NavFooter";
