import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";
import { type ReactNode } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { GlobalNavContextProvider } from "../global-nav-context";

type GlobalNavProps = BoxProps<
  "nav",
  {
    addonAfter?: ReactNode;
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
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

    return (
      <GlobalNavContextProvider expanded={expanded}>
        <Flex
          asChild
          bg="surface"
          borderR="1"
          justifyContent="space-between"
          pb="md"
          pt="lg"
          w={expanded ? "224" : "auto"}
          {...props}
        >
          <RadixCollapsible.Root
            asChild
            onOpenChange={setExpanded}
            open={expanded}
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
                <Flex asChild gap="xs" px="xs">
                  <ul>{addonAfter}</ul>
                </Flex>
              )}
            </nav>
          </RadixCollapsible.Root>
        </Flex>
      </GlobalNavContextProvider>
    );
  },
);

GlobalNav.displayName = "@optiaxiom/react/GlobalNav";
