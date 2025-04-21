import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useNavGroupContext } from "./NavGroupContext";

type NavListProps = BoxProps<"div">;

export const NavList = forwardRef<HTMLUListElement, NavListProps>(
  ({ children, ...props }, ref) => {
    const { id } = useNavGroupContext("@optiaxiom/react/NavList");
    if (id) {
      throw new Error("huh");
    }

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
