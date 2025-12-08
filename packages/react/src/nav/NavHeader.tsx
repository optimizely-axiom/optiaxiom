import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { useSidebarContext } from "../sidebar/internals";

export type NavHeaderProps = BoxProps<"div">;

/**
 * @group Sidebar
 */
export const NavHeader = forwardRef<HTMLDivElement, NavHeaderProps>(
  ({ children, ...props }, ref) => {
    const { spacing } = useSidebarContext("@optiaxiom/react/NavHeader");

    return (
      <Group flexDirection="column" gap="16" px={spacing} ref={ref} {...props}>
        {children}
      </Group>
    );
  },
);

NavHeader.displayName = "@optiaxiom/react/NavHeader";
