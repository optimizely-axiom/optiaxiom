import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { Flex } from "../flex";
import { useGlobalNavContext } from "../global-nav-context";
import { Tooltip } from "../tooltip";

export type GlobalNavItemProps = ButtonProps<
  typeof Button,
  {
    active?: boolean;
  }
>;

export const GlobalNavItem = forwardRef<HTMLButtonElement, GlobalNavItemProps>(
  ({ active, addonAfter, addonBefore, children, ...props }, ref) => {
    const { expanded } = useGlobalNavContext("GlobalNavItem");

    return (
      <Flex asChild>
        <li>
          <Tooltip content={!expanded && children} side="right">
            <Button
              addonAfter={expanded && addonAfter}
              appearance="secondary"
              data-state={active ? "active" : undefined}
              icon={addonBefore}
              ref={ref}
              size="lg"
              {...props}
            >
              {expanded && (
                <RadixCollapsible.Content asChild>
                  <Flex flex="1" textAlign="start">
                    {children}
                  </Flex>
                </RadixCollapsible.Content>
              )}
            </Button>
          </Tooltip>
        </li>
      </Flex>
    );
  },
);

GlobalNavItem.displayName = "@optiaxiom/react/GlobalNavItem";
