import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import * as styles from "./Tabs.css";

export type TabsProps = BoxProps<typeof RadixTabs.Root>;

/**
 * Tabs organize content into multiple sections with horizontal navigation.
 *
 * Use this component when users need to switch between different views of
 * related content. Don't manually build tab navigation with multiple Buttons in
 * a Flex - Tabs handles state management, active states, keyboard navigation,
 * and accessibility automatically.
 *
 * When not to use:
 * - For primary/vertical navigation use Sidebar instead.
 *
 * @group Tabs
 * @since 0.1.0
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);

    return (
      <Box asChild {...styles.tabs({}, className)} {...boxProps}>
        <RadixTabs.Root ref={ref} {...restProps}>
          {children}
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
