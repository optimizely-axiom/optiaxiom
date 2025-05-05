import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SidebarProvider } from "../sidebar/internals";
import * as styles from "./SubNav.css";

export type SubNavProps = BoxProps<"nav">;

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
            <SidebarProvider
              expanded
              navId=""
              onExpandedChange={() => {}}
              spacing="12"
            >
              {children}
            </SidebarProvider>
          </nav>
        </Flex>
      </Flex>
    );
  },
);

SubNav.displayName = "@optiaxiom/react/SubNav";
