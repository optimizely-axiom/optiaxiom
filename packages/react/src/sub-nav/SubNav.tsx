import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SidebarContextProvider } from "../sidebar-context";
import * as styles from "./SubNav.css";

type SubNavProps = BoxProps<"nav">;

export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Flex borderR="1" h="full" ref={ref} w="fit" {...props}>
        <Flex
          asChild
          bg="bg.default"
          flex="1"
          gap="0"
          overflow="hidden"
          py="16"
        >
          <nav aria-label="SubNav" {...styles.item({}, className)}>
            <SidebarContextProvider
              animations={false}
              expanded
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
