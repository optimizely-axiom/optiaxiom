import { useId } from "@radix-ui/react-id";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { SidebarContextProvider } from "../sidebar-context";

type SidebarProps = BoxProps<
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
      defaultExpanded,
      expanded: expandedProp,
      onExpandedChange,
      ...props
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useControllableState({
      defaultProp: defaultExpanded,
      onChange: onExpandedChange,
      prop: expandedProp,
    });

    return (
      <SidebarContextProvider
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
      </SidebarContextProvider>
    );
  },
);

Sidebar.displayName = "@optiaxiom/react/Sidebar";
