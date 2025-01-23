import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";

type NavGroupContentProps = BoxProps<"div">;

export const NavGroupContent = forwardRef<HTMLDivElement, NavGroupContentProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex ref={ref} role="list" w="full" {...props}>
        {children}
      </Flex>
    );
  },
);

NavGroupContent.displayName = "@optiaxiom/react/NavGroupContent";
