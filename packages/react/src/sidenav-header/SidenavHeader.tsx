import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type SidenavHeaderProps = BoxProps<"div">;

export const SidenavHeader = forwardRef<HTMLDivElement, SidenavHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex ref={ref} role="list" {...props}>
        {children}
      </Flex>
    );
  },
);

SidenavHeader.displayName = "@optiaxiom/react/SidenavHeader";
