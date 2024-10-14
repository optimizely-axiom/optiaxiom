import { type ComponentPropsWithRef, forwardRef } from "react";

import { useSideNavContext } from "../side-nav-context";
import { SideNavItem } from "../side-nav-item";

export type SideNavToggleProps = {
  "aria-label"?: string;
} & Omit<ComponentPropsWithRef<typeof SideNavItem>, "aria-label">;

export const SideNavToggle = forwardRef<HTMLButtonElement, SideNavToggleProps>(
  ({ "aria-label": ariaLabel, children, ...props }, ref) => {
    const { expanded, onExpandedChange } = useSideNavContext("SideNavToggle");
    return (
      <SideNavItem
        aria-label={ariaLabel || (expanded ? "Collapse" : "Expand")}
        fontWeight="400"
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
