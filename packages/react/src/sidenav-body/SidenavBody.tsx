import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type SidenavBodyProps = BoxProps<"div">;

export const SidenavBody = forwardRef<HTMLDivElement, SidenavBodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        flex="1"
        gap="4"
        justifyContent="start"
        overflowX="hidden"
        overflowY="auto"
        py="8"
        ref={ref}
        role="list"
        w="full"
        {...props}
      >
        {children}
      </Flex>
    );
  },
);

SidenavBody.displayName = "@optiaxiom/react/SidenavBody";
