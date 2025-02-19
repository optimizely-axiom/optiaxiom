import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SidebarContextProvider } from "../sidebar-context";
import * as styles from "./SubNav.css";

type SubNavProps = BoxProps<"nav">;

export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex
        borderColor="border.tertiary"
        borderR="1"
        h="full"
        ref={ref}
        w="fit"
        {...props}
      >
        <Flex asChild {...styles.nav()}>
          <nav aria-label="Secondary">
            <SidebarContextProvider
              expanded
              navId=""
              onExpandedChange={() => {}}
              spacing="12"
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
