import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { SidebarProvider } from "../sidebar/internals";
import * as styles from "./SubNav.css";

export type SubNavProps = BoxProps<"nav">;

/**
 * @group Sidebar
 */
export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, ...props }, ref) => {
    return (
      <Group
        borderColor="border.tertiary"
        borderR="1"
        flexDirection="column"
        gap="16"
        h="full"
        ref={ref}
        w="fit"
        {...props}
      >
        <Group asChild {...styles.nav()}>
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
        </Group>
      </Group>
    );
  },
);

SubNav.displayName = "@optiaxiom/react/SubNav";
