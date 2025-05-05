import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
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

    return (
      <SidebarProvider
        expanded={expanded}
        navId={useId()}
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
