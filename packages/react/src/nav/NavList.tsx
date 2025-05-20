import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";

export type NavListProps = BoxProps<"div">;

export const NavList = forwardRef<HTMLUListElement, NavListProps>(
  ({ children, ...props }, ref) => {
    return (
      <Box
        asChild
        display="flex"
        flexDirection="column"
        gap="4"
        p="0"
        {...props}
      >
        <ul ref={ref}>{children}</ul>
      </Box>
    );
  },
);

NavList.displayName = "@optiaxiom/react/NavList";
