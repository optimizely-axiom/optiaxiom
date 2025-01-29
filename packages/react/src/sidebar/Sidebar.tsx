import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef, useState } from "react";

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

    const [animations, setAnimations] = useState(false);
    const timerRef = useRef<number | undefined>();
    useEffect(() => {
      timerRef.current = window.setTimeout(() => setAnimations(false), 300);
    }, [animations]);

    return (
      <SidebarContextProvider
        animations={animations}
        expanded={expanded}
        onExpandedChange={(flag) => {
          window.clearTimeout(timerRef.current);
          setAnimations(true);

          setExpanded(flag);
        }}
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
