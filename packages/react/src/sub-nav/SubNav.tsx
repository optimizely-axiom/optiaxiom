import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Group } from "../group";
import { useEvent } from "../hooks";
import { SidebarProvider, useSidebarContext } from "../sidebar/internals";
import * as styles from "./SubNav.css";

export type SubNavProps = BoxProps<"nav">;

/**
 * @group Sidebar
 */
export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, ...props }, ref) => {
    const { onActiveChange } = useSidebarContext("@optiaxiom/react/SubNav");

    return (
      <Group
        borderColor="border.secondary"
        borderL="1"
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
              current="page"
              expanded
              navId=""
              onActiveChange={useEvent((active: boolean) =>
                onActiveChange(active, "sub-nav"),
              )}
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
