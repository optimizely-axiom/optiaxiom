import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { Flex } from "../flex";
import { useSidenavContext } from "../sidenav-context";
import { Tooltip } from "../tooltip";
import { Transition } from "../transition";
import { decorateChildren, fallbackSpan } from "../utils";
import * as styles from "./SidenavItem.css";

export type SidenavItemProps = ButtonProps<
  typeof Button,
  {
    active?: boolean;
    "aria-label": string;
  }
>;

export const SidenavItem = forwardRef<HTMLButtonElement, SidenavItemProps>(
  ({ active, addonAfter, asChild, children, className, ...props }, ref) => {
    const { animations, expanded } = useSidenavContext("SidenavItem");

    let tooltip = null;
    children = decorateChildren({ asChild, children }, (children) => {
      tooltip = children;
      return (
        expanded && (
          <Transition skipAnimations={!animations}>
            <Box whiteSpace="nowrap">{children}</Box>
          </Transition>
        )
      );
    });

    return (
      <Flex asChild>
        <li>
          <Tooltip
            content={!expanded && (props["aria-label"] || tooltip)}
            side="right"
          >
            <Button
              addonAfter={
                expanded && (
                  <Box asChild ml="auto">
                    {fallbackSpan(addonAfter)}
                  </Box>
                )
              }
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

SidenavItem.displayName = "@optiaxiom/react/SidenavItem";
