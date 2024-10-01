import { type ComponentPropsWithRef, forwardRef } from "react";

import { useSideNavContext } from "../side-nav-context";
import { SideNavItem } from "../side-nav-item";

export type SideNavToggleProps = ComponentPropsWithRef<typeof SideNavItem>;

export const SideNavToggle = forwardRef<HTMLButtonElement, SideNavToggleProps>(
  ({ children, ...props }, ref) => {
    const { expanded, onExpandedChange } = useSideNavContext("SideNavToggle");
    return (
      <SideNavItem
        onClick={() => onExpandedChange(!expanded)}
        ref={ref}
        {...props}
      >
        {children ? children : expanded ? "Collapse" : "Expand"}
      </SideNavItem>
    );
  },
);

SideNavToggle.displayName = "@optiaxiom/react/SideNavToggle";
