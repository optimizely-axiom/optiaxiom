import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar/internals";
import * as styles from "./Nav.css";

export type NavProps = BoxProps<
  "nav",
  {
    /**
     * The initial expanded state in uncontrolled mode.
     */
    defaultExpanded?: boolean;
    /**
     * The expanded state in controlled mode.
     */
    expanded?: boolean;
    /**
     * Handler that is called when the expanded state changes.
     */
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const Nav = forwardRef<HTMLDivElement, NavProps>(
  ({ children, ...props }, ref) => {
    const { expanded, navId } = useSidebarContext("@optiaxiom/react/Nav");

    return (
      <Flex
        borderColor="border.tertiary"
        borderR="1"
        h="full"
        ref={ref}
        w="fit"
        {...props}
      >
        <Flex asChild id={navId} w={expanded ? "224" : "56"} {...styles.nav()}>
          <nav aria-label="Main">{children}</nav>
        </Flex>
      </Flex>
    );
  },
);

Nav.displayName = "@optiaxiom/react/Nav";
