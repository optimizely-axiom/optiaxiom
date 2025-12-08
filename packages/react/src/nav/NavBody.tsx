import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { useSidebarContext } from "../sidebar/internals";
import * as styles from "./NavBody.css";

export type NavBodyProps = BoxProps<"div">;

/**
 * @group Sidebar
 */
export const NavBody = forwardRef<HTMLDivElement, NavBodyProps>(
  ({ children, className, ...props }, ref) => {
    const { expanded, spacing } = useSidebarContext("@optiaxiom/react/NavBody");

    return (
      <Group
        px={spacing}
        ref={ref}
        {...styles.body({ expanded }, className)}
        {...props}
      >
        {children}
      </Group>
    );
  },
);

NavBody.displayName = "@optiaxiom/react/NavBody";
