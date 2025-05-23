import { createSlot } from "@radix-ui/react-slot";
import { forwardRef, type ReactNode } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { useSidebarContext } from "../sidebar/internals";
import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { decorateChildren, fallbackSpan } from "../utils";
import * as styles from "./NavItem.css";

const Slot = createSlot("@optiaxiom/react/NavItem");

export type NavItemProps = BoxProps<
  "button",
  {
    /**
     * Whether the nav item is currently active.
     */
    active?: boolean;
    /**
     * Display content inside the button after `children`.
     */
    addonAfter?: ReactNode;
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

    const { expanded } = useSidebarContext("@optiaxiom/react/NavItem");

    let tooltip = null;
    children = decorateChildren({ asChild, children }, (children) => {
      tooltip = children;
      return (
        <>
          {icon ? (
            <Box display="grid" flex="none" placeItems="center" size="lg">
              <Icon asChild>{icon}</Icon>
            </Box>
          ) : (
            <Box flex="none" size="12" />
          )}

          <Box {...styles.label({ expanded: Boolean(expanded) })}>
            <Text truncate>{children}</Text>

            {addonAfter && (
              <Box asChild display="flex" flex="none">
                {fallbackSpan(addonAfter)}
              </Box>
            )}
          </Box>
        </>
      );
    });

    return (
      <Flex asChild>
        <li>
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
        </li>
      </Flex>
    );
  },
);

NavItem.displayName = "@optiaxiom/react/NavItem";
