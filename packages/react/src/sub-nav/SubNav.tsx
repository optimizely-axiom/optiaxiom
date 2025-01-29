import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SidebarContextProvider } from "../sidebar-context";

type SubNavProps = BoxProps<"nav">;

export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, ...props }, ref) => {
    return (
      <Flex borderR="1" h="full" ref={ref} w="fit" {...props}>
        <Flex
          asChild
          bg="bg.default"
          flex="1"
          gap="0"
          overflow="hidden"
          w="224"
        >
          <nav aria-label="SubNav">
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
