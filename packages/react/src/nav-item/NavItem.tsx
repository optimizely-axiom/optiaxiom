import { forwardRef } from "react";

import { Box } from "../box";
import { Button, type ButtonProps } from "../button";
import { Flex } from "../flex";
import { useSidebarContext } from "../sidebar-context";
import { Tooltip } from "../tooltip";
import { Transition } from "../transition";
import { decorateChildren } from "../utils";
import * as styles from "./NavItem.css";

export type NavItemProps = ButtonProps<
  typeof Button,
  {
    active?: boolean;
    "aria-label": string;
  }
>;

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  ({ active, addonAfter, asChild, children, className, ...props }, ref) => {
    const { animations, expanded } = useSidebarContext("NavItem");

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
      <Flex role="listitem">
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
      </Flex>
    );
  },
);

NavItem.displayName = "@optiaxiom/react/NavItem";
