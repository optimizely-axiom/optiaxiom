import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type NavBodyProps = BoxProps<"div">;

export const NavBody = forwardRef<HTMLDivElement, NavBodyProps>(
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

NavBody.displayName = "@optiaxiom/react/NavBody";
