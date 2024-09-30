import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";
import { type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { GlobalNavContextProvider } from "../global-nav-context";
import { GlobalNavItem } from "../global-nav-item";
import { IconCollapse } from "../icons/IconCollapse";
import { extractSprinkles } from "../sprinkles";

type GlobalNavProps = BoxProps<
  "nav",
  {
    addonAfter?: ReactNode;
    collapsible?: boolean;
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
      collapsible = true,
      defaultExpanded,
      expanded: expandedProp,
      onExpandedChange,
      ...props
    },
    ref,
  ) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const [expanded, setExpanded] = useControllableState({
      defaultProp: defaultExpanded,
      onChange: onExpandedChange,
      prop: expandedProp,
    });

    return (
      <GlobalNavContextProvider expanded={expanded}>
        <RadixCollapsible.Root onOpenChange={setExpanded} open={expanded}>
          <Flex border="1" pb="md" pt="lg">
            <Box asChild display="flex" {...sprinkleProps}>
              <nav aria-label="Global Navigation" ref={ref} {...restProps}>
                <Flex alignItems="center" gap="4" px="xs" w="full">
                  <Flex flex="1" gap="4" justifyContent="start" w="full">
                    {children}
                  </Flex>

                  {collapsible && (
                    <RadixCollapsible.Trigger asChild>
                      <GlobalNavItem addonBefore={<IconCollapse />}>
                        Collapse
                      </GlobalNavItem>
                    </RadixCollapsible.Trigger>
                  )}
                </Flex>
              </nav>
            </Box>
            <Box asChild>{addonAfter}</Box>
          </Flex>
        </RadixCollapsible.Root>
      </GlobalNavContextProvider>
    );
  },
);

GlobalNav.displayName = "@optiaxiom/react/GlobalNav";
