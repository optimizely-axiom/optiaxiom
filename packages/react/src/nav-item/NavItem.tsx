import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { useSidebarContext } from "../sidebar-context";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { decorateChildren, fallbackSpan } from "../utils";
import * as styles from "./NavItem.css";

export type NavItemProps = BoxProps<
  "button",
  {
    active?: boolean;
    /**
     * Display content inside the button after `children`.
     */
    addonAfter?: ReactNode;
    "aria-label": string;
    /**
     * Display an icon before button content.
     */
    icon?: ReactNode;
  }
>;

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps>(
  (
    {
      active,
      addonAfter,
      asChild,
      children,
      className,
      disabled,
      icon,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { boxProps, restProps } = extractBoxProps(props);

    const { expanded } = useSidebarContext("NavItem");

    let tooltip = null;
    children = decorateChildren({ asChild, children }, (children) => {
      tooltip = children;
      return (
        <>
          <Flex flex="none" size="lg">
            <Icon asChild>{icon}</Icon>
          </Flex>

          <Text truncate {...styles.label({ expanded: Boolean(expanded) })}>
            {children}
          </Text>

          {addonAfter && expanded && (
            <Box asChild display="flex" flex="none">
              {fallbackSpan(addonAfter)}
            </Box>
          )}
        </>
      );
    });

    return (
      <Flex role="listitem">
        <Tooltip
          content={props["aria-label"] || tooltip}
          disabled={expanded}
          side="right"
        >
          <Box
            asChild
            data-disabled={disabled ? "" : undefined}
            data-state={active ? "active" : undefined}
            {...styles.item({}, className)}
            {...boxProps}
          >
            <Comp disabled={disabled} ref={ref} {...restProps}>
              {children}
            </Comp>
          </Box>
        </Tooltip>
      </Flex>
    );
  },
);

NavItem.displayName = "@optiaxiom/react/NavItem";
