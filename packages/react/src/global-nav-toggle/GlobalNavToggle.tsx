import { type ComponentPropsWithRef, forwardRef } from "react";

import { useGlobalNavContext } from "../global-nav-context";
import { GlobalNavItem } from "../global-nav-item";

export type GlobalNavToggleProps = ComponentPropsWithRef<typeof GlobalNavItem>;

export const GlobalNavToggle = forwardRef<
  HTMLButtonElement,
  GlobalNavToggleProps
>(({ children, ...props }, ref) => {
  const { expanded, onExpandedChange } = useGlobalNavContext("GlobalNavItem");
  return (
    <GlobalNavItem
      onClick={() => onExpandedChange(!expanded)}
      ref={ref}
      {...props}
    >
      {children ? children : expanded ? "Collapse" : "Expand"}
    </GlobalNavItem>
  );
});

GlobalNavToggle.displayName = "@optiaxiom/react/GlobalNavToggle";
