import { cloneElement, forwardRef, isValidElement } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { Flex } from "../flex";
import { useGlobalNavContext } from "../global-nav-context";
import { Tooltip } from "../tooltip";
import { Transition } from "../transition";

export type GlobalNavItemProps = ButtonProps<
  typeof Button,
  {
    active?: boolean;
  }
>;

export const GlobalNavItem = forwardRef<HTMLButtonElement, GlobalNavItemProps>(
  ({ active, addonAfter, asChild, children, ...props }, ref) => {
    const { animations, expanded } = useGlobalNavContext("GlobalNavItem");

    let tooltip = children;
    if (asChild) {
      const newElement = isValidElement(children) ? children : null;
      tooltip = newElement ? newElement.props.children : tooltip;
      children = newElement
        ? cloneElement(
            newElement,
            undefined,
            expanded && (
              <Flex flex="1">
                <Transition skipAnimations={!animations}>
                  <Box>{newElement.props.children}</Box>
                </Transition>
              </Flex>
            ),
          )
        : children;
    } else {
      children = expanded && (
        <Flex flex="1">
          <Transition skipAnimations={!animations}>
            <Box>{children}</Box>
          </Transition>
        </Flex>
      );
    }

    return (
      <Flex asChild>
        <li>
          <Tooltip
            content={!expanded && (props["aria-label"] || tooltip)}
            side="right"
          >
            <Button
              addonAfter={expanded && addonAfter}
              appearance="secondary"
              asChild={asChild}
              data-state={active ? "active" : undefined}
              justifyContent="start"
              ref={ref}
              size="lg"
              textAlign="start"
              transition={animations ? "all" : undefined}
              {...props}
            >
              {children}
            </Button>
          </Tooltip>
        </li>
      </Flex>
    );
  },
);

GlobalNavItem.displayName = "@optiaxiom/react/GlobalNavItem";
