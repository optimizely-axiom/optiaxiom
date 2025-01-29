import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar-context";
import * as styles from "./Nav.css";

type NavProps = BoxProps<
  "nav",
  {
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const Nav = forwardRef<HTMLDivElement, NavProps>(
  ({ children, ...props }, ref) => {
    const { expanded } = useSidebarContext("Nav");

    return (
      <Flex borderR="1" h="full" ref={ref} w="fit" {...props}>
        <Flex asChild {...styles.nav()} w={expanded ? "224" : "56"}>
          <nav aria-label="Main">{children}</nav>
        </Flex>
      </Flex>
    );
  },
);

Nav.displayName = "@optiaxiom/react/Nav";
