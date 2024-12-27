import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type SidenavFooterProps = BoxProps<"div">;

export const SidenavFooter = forwardRef<HTMLDivElement, SidenavFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        gap="8"
        mt="auto"
        overflowX="hidden"
        py="8"
        ref={ref}
        role="list"
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

SidenavFooter.displayName = "@optiaxiom/react/SidenavFooter";
