import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar/internals";

export type NavHeaderProps = BoxProps<"div">;

export const NavHeader = forwardRef<HTMLDivElement, NavHeaderProps>(
  ({ children, ...props }, ref) => {
    const { spacing } = useSidebarContext("@optiaxiom/react/NavHeader");

    return (
      <Flex px={spacing} ref={ref} {...props}>
        {children}
      </Flex>
    );
  },
);

NavHeader.displayName = "@optiaxiom/react/NavHeader";
