import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { useSidebarContext } from "../sidebar/internals";

export type NavFooterProps = BoxProps<"div">;

/**
 * @group Sidebar
 */
export const NavFooter = forwardRef<HTMLDivElement, NavFooterProps>(
  ({ children, ...props }, ref) => {
    const { spacing } = useSidebarContext("@optiaxiom/react/NavFooter");

    return (
      <Group
        flexDirection="column"
        gap="8"
        mt="auto"
        overflowX="hidden"
        px={spacing}
        py="8"
        ref={ref}
        {...props}
      >
        {children}
      </Group>
    );
  },
);

NavFooter.displayName = "@optiaxiom/react/NavFooter";
