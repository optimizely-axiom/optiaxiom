import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { SidebarContextProvider } from "../sidebar-context";

type SidebarProps = {
  children?: ReactNode;
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
};

export const Sidebar = ({
  children,
  defaultExpanded,
  expanded: expandedProp,
  onExpandedChange,
}: SidebarProps) => {
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
      {children}
    </SidebarContextProvider>
  );
};

Sidebar.displayName = "@optiaxiom/react/Sidebar";
