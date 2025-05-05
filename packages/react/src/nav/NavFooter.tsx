import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar/internals";

export type NavFooterProps = BoxProps<"div">;

export const NavFooter = forwardRef<HTMLDivElement, NavFooterProps>(
  ({ children, ...props }, ref) => {
    const { spacing } = useSidebarContext("@optiaxiom/react/NavFooter");

    return (
      <Flex
        gap="8"
        mt="auto"
        overflowX="hidden"
        px={spacing}
        py="8"
        ref={ref}
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

NavFooter.displayName = "@optiaxiom/react/NavFooter";
