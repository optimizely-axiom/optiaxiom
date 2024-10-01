import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef, useState } from "react";
import { type ReactNode } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { SideNavContextProvider } from "../side-nav-context";

type SideNavProps = BoxProps<
  "nav",
  {
    addonAfter?: ReactNode;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  (
    {
      addonAfter,
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
      <SideNavContextProvider
        animations={animations}
        expanded={expanded}
        onExpandedChange={(flag) => {
          window.clearTimeout(timerRef.current);
          setAnimations(true);

          setExpanded(flag);
        }}
      >
        <Flex borderR="1" {...props}>
          <Flex
            asChild
            bg="surface"
            flex="1"
            justifyContent="space-between"
            pb="md"
            pt="lg"
            transition={animations ? "all" : undefined}
            w={expanded ? "224" : "56"}
          >
            <nav aria-label="Global Navigation" ref={ref}>
              <Flex
                asChild
                flex="1"
                gap="4"
                justifyContent="start"
                overflowY="auto"
                px="xs"
                w="full"
              >
                <ul>{children}</ul>
              </Flex>

              {addonAfter && (
                <Flex asChild gap="xs" overflowX="hidden" px="xs">
                  <ul>{addonAfter}</ul>
                </Flex>
              )}
            </nav>
          </Flex>
        </Flex>
      </SideNavContextProvider>
    );
  },
);

SideNav.displayName = "@optiaxiom/react/SideNav";
