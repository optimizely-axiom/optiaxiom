import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar-context";

type SubNavProps = BoxProps<
  "nav",
  {
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const SubNav = forwardRef<HTMLDivElement, SubNavProps>(
  ({ children, ...props }, ref) => {
    const { animations, expanded } = useSidebarContext("SubNav");

    return (
      <Flex borderR="1" h="full" ref={ref} w="fit" {...props}>
        <Flex
          asChild
          bg="bg.default"
          flex="1"
          gap="0"
          overflow="hidden"
          pb="8"
          pt="16"
          transition={animations ? "all" : undefined}
          w={expanded ? "224" : "56"}
        >
          <nav aria-label="Main">{children}</nav>
        </Flex>
      </Flex>
    );
  },
);

SubNav.displayName = "@optiaxiom/react/SubNav";
