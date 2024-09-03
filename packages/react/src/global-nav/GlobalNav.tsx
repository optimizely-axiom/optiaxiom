import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, forwardRef } from "react";
import { type ReactNode } from "react";

import type { ExtendProps } from "../utils";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { GlobalNavContext } from "../global-nav-context";
import { GlobalNavItem } from "../global-nav-item";
import { IconCollapse } from "../icons/IconCollapse";
import { extractSprinkles } from "../sprinkles";

type GlobalNavProps = ExtendProps<
  Omit<
    ComponentPropsWithRef<typeof RadixCollapsible.Root>,
    "defaultOpen" | "onOpenChange" | "open"
  >,
  BoxProps<
    "nav",
    {
      defaultExpanded?: boolean;
      endDecorator?: ReactNode;
      expanded?: boolean;
      onExpandedChange?: (expanded: boolean) => void;
    }
  >
>;

export const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
  (
    {
      children,
      defaultExpanded,
      endDecorator,
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
      <GlobalNavContext.Provider value={{ expanded }}>
        <RadixCollapsible.Root onOpenChange={setExpanded} open={expanded}>
          <Flex border="1" pb="md" pt="lg">
            <Box asChild display="flex" {...sprinkleProps}>
              <nav aria-label="Global Navigation" ref={ref} {...restProps}>
                <Flex alignItems="center" gap="4" px="xs" w="full">
                  <Flex flex="1" gap="4" justifyContent="start" w="full">
                    {children}
                  </Flex>

                  <RadixCollapsible.Trigger asChild>
                    <GlobalNavItem startDecorator={<IconCollapse />}>
                      Collapse
                    </GlobalNavItem>
                  </RadixCollapsible.Trigger>
                </Flex>
              </nav>
            </Box>
            <Box asChild>{endDecorator}</Box>
          </Flex>
        </RadixCollapsible.Root>
      </GlobalNavContext.Provider>
    );
  },
);

GlobalNav.displayName = "@optiaxiom/react/GlobalNav";
