import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useEffect, useRef, useState } from "react";

import { type BoxProps } from "../box";
import { SidenavContextProvider } from "../sidenav-context";

type SidenavProps = BoxProps<
  "nav",
  {
    defaultExpanded?: boolean;
    expanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
  }
>;

export const Sidenav = ({
  children,
  defaultExpanded,
  expanded: expandedProp,
  onExpandedChange,
}: SidenavProps) => {
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
    <SidenavContextProvider
      animations={animations}
      expanded={expanded}
      onExpandedChange={(flag) => {
        window.clearTimeout(timerRef.current);
        setAnimations(true);

        setExpanded(flag);
      }}
    >
      {children}
    </SidenavContextProvider>
  );
};

Sidenav.displayName = "@optiaxiom/react/Sidenav";
