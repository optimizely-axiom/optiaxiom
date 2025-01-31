import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SidebarContextProvider } from "../sidebar-context";
import * as styles from "./SubNav.css";

type SubNavProps = BoxProps<"nav">;

export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex borderR="1" h="full" ref={ref} w="fit" {...props}>
        <Flex asChild {...styles.nav()}>
          <nav aria-label="SubNav">
            <SidebarContextProvider
              expanded
              navId=""
              onExpandedChange={() => {}}
            >
              {children}
            </SidebarContextProvider>
          </nav>
        </Flex>
      </Flex>
    );
  },
);

SubNav.displayName = "@optiaxiom/react/SubNav";
