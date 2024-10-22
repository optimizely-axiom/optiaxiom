import { cloneElement, forwardRef, isValidElement } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { Flex } from "../flex";
import { useSideNavContext } from "../side-nav-context";
import { Tooltip } from "../tooltip";
import { Transition } from "../transition";
import * as styles from "./SideNavItem.css";

export type SideNavItemProps = ButtonProps<
  typeof Button,
  {
    active?: boolean;
    "aria-label": string;
  }
>;

export const SideNavItem = forwardRef<HTMLButtonElement, SideNavItemProps>(
  ({ active, addonAfter, asChild, children, className, ...props }, ref) => {
    const { animations, expanded } = useSideNavContext("SideNavItem");

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
              appearance="subtle"
              asChild={asChild}
              data-state={active ? "active" : undefined}
              justifyContent={expanded ? "start" : "center"}
              ref={ref}
              size="lg"
              transition={animations ? "colors" : undefined}
              {...styles.item({}, className)}
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

SideNavItem.displayName = "@optiaxiom/react/SideNavItem";
