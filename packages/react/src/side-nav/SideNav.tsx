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
    addonBefore?: ReactNode;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const SideNav = forwardRef<HTMLElement, SideNavProps>(
  (
    {
      addonAfter,
      addonBefore,
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
        <Flex borderR="1" w="fit" {...props}>
          <Flex
            asChild
            bg="bg.default"
            flex="1"
            gap="0"
            overflow="hidden"
            pb="xs"
            pt="md"
            transition={animations ? "all" : undefined}
            w={expanded ? "224" : "56"}
          >
            <nav aria-label="Main" ref={ref}>
              {addonBefore}

              <Flex
                asChild
                flex="1"
                gap="4"
                justifyContent="start"
                overflowX="hidden"
                overflowY="auto"
                py="xs"
                w="full"
              >
                <ul>{children}</ul>
              </Flex>

              {addonAfter && (
                <Flex asChild gap="xs" mt="auto" overflowX="hidden" py="xs">
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
