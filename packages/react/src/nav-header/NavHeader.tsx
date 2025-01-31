import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type NavHeaderProps = BoxProps<"div">;

export const NavHeader = forwardRef<HTMLDivElement, NavHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

NavHeader.displayName = "@optiaxiom/react/NavHeader";
