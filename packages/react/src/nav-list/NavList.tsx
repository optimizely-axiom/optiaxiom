import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { DisclosureContent } from "../disclosure-content";
import { useNavGroupContext } from "../nav-group-context";

type NavListProps = BoxProps<"div">;

export const NavList = forwardRef<HTMLUListElement, NavListProps>(
  ({ children, ...props }, ref) => {
    const { id } = useNavGroupContext("NavList");
    const Comp = id ? DisclosureContent : Box;

    return (
      <Comp
        asChild
        display="flex"
        flexDirection="column"
        gap="4"
        p="0"
        {...props}
      >
        <ul ref={ref}>{children}</ul>
      </Comp>
    );
  },
);

NavList.displayName = "@optiaxiom/react/NavList";
