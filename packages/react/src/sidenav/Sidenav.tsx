import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef, useState } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SidenavContextProvider } from "../sidenav-context";

type SidenavProps = BoxProps<
  "nav",
  {
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const Sidenav = forwardRef<HTMLElement, SidenavProps>(
  (
    {
      children,
      defaultExpanded,
      expanded: expandedProp,
      onExpandedChange,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useControllableState({
      defaultProp: defaultExpanded,
      onChange: onExpandedChange,
      prop: expandedProp,
    });

    const [animations, setAnimations] = useState(false);
    const timerRef = useRef<number | undefined>();
    useEffect(() => {
      timerRef.current = window.setTimeout(() => setAnimations(false), 300);
    }, [animations]);

    return (
      <SidenavContextProvider
        animations={animations}
        expanded={expanded}
        onExpandedChange={(flag) => {
          window.clearTimeout(timerRef.current);
          setAnimations(true);

          setExpanded(flag);
        }}
      >
        <Flex borderR="1" w="fit" {...props}>
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
            <nav aria-label="Main" ref={ref}>
              {children}
            </nav>
          </Flex>
        </Flex>
      </SidenavContextProvider>
    );
  },
);

Sidenav.displayName = "@optiaxiom/react/Sidenav";
