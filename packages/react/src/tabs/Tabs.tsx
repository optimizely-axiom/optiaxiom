import * as RadixTabs from "@radix-ui/react-tabs";
import { forwardRef, useEffect, useState } from "react";

import { Box, type BoxProps, extractBoxProps } from "../box";
import { useEffectEvent } from "../hooks";
import { useSurface } from "../surface";
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
 * @category navigation
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ children, className, onValueChange, ...props }, ref) => {
    const { boxProps, restProps } = extractBoxProps(props);
    const surface = useSurface("tab");
    const { track } = surface ?? {};
    const trackStable = useEffectEvent(track ?? (() => {}));

    // Track initial active tab on mount
    const [initialValue] = useState(props.value);
    useEffect(() => {
      if (initialValue) {
        trackStable({ id: initialValue, name: "viewed" });
      }
    }, [initialValue, trackStable]);

    return (
      <Box asChild {...styles.tabs({}, className)} {...boxProps}>
        <RadixTabs.Root
          onValueChange={(value: string) => {
            onValueChange?.(value);
            track?.({ id: value, name: "viewed" });
          }}
          ref={ref}
          {...restProps}
        >
          {children}
        </RadixTabs.Root>
      </Box>
    );
  },
);

Tabs.displayName = "@optiaxiom/react/Tabs";
