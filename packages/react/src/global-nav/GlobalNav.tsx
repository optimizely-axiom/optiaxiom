import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef, useState } from "react";
import { type ReactNode } from "react";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { GlobalNavContext } from "../global-nav-context";
import { GlobalNavItem } from "../global-nav-item";
import { IconCollapse } from "../icons/IconCollapse";
import { extractSprinkles } from "../sprinkles";

type GlobalNavProps = BoxProps<
  "nav",
  {
    endDecorator?: ReactNode;
  }
>;

export const GlobalNav = forwardRef<HTMLElement, GlobalNavProps>(
  ({ children, endDecorator, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);
    const [open, setOpen] = useState(false);

    return (
      <GlobalNavContext.Provider value={{ open }}>
        <RadixCollapsible.Root onOpenChange={() => setOpen(!open)} open={open}>
          <Flex border="1" pb="md" pt="lg">
            <Box asChild display="flex" {...sprinkleProps}>
              <nav
                aria-label="Global Navigation"
                ref={ref}
                role="navigation"
                {...restProps}
              >
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
