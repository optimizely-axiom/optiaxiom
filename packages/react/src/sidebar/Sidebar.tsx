import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useState } from "react";

import { Box, type BoxProps } from "../box";
import { useEvent } from "../hooks";
import { SidebarProvider } from "./SidebarContext";

export type SidebarProps = BoxProps<
  "div",
  {
    /**
     * The initial expanded state in uncontrolled mode.
     */
    defaultExpanded?: boolean;
    /**
     * The expanded state in controlled mode.
     */
    expanded?: boolean;
    /**
     * Handler that is called when the expanded state changes.
     */
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

/**
 * Primary navigation menu for left side of the page that includes support for branding, links, etc.
 *
 * @group Sidebar
 * @category navigation
 * @since 0.4.0
 */
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      children,
      defaultExpanded = false,
      expanded: expandedProp,
      onExpandedChange,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useControllableState({
      caller: "@optiaxiom/react/Sidebar",
      defaultProp: defaultExpanded,
      onChange: onExpandedChange,
      prop: expandedProp,
    });
    const [subNavActiveCount, setSubNavActiveCount] = useState(0);

    return (
      <SidebarProvider
        current={subNavActiveCount ? "true" : "page"}
        expanded={expanded}
        navId={useId()}
        onActiveChange={useEvent((active: boolean, nav?: "sub-nav") => {
          if (nav === "sub-nav") {
            setSubNavActiveCount((count) => count + (active ? 1 : -1));
          }
        })}
        onExpandedChange={setExpanded}
        spacing="8"
      >
        <Box
          alignItems="stretch"
          display="flex"
          gap="0"
          h="full"
          ref={ref}
          {...props}
        >
          {children}
        </Box>
      </SidebarProvider>
    );
  },
);

Sidebar.displayName = "@optiaxiom/react/Sidebar";
