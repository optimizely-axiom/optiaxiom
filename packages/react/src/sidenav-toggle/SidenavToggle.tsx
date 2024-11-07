import { type ComponentPropsWithRef, forwardRef } from "react";

import { useSidenavContext } from "../sidenav-context";
import { SidenavItem } from "../sidenav-item";

export type SidenavToggleProps = {
  "aria-label"?: string;
} & Omit<ComponentPropsWithRef<typeof SidenavItem>, "aria-label">;

export const SidenavToggle = forwardRef<HTMLButtonElement, SidenavToggleProps>(
  ({ "aria-label": ariaLabel, children, ...props }, ref) => {
    const { expanded, onExpandedChange } = useSidenavContext("SidenavToggle");
    return (
      <SidenavItem
        aria-label={ariaLabel || (expanded ? "Collapse" : "Expand")}
        fontWeight="400"
        onClick={() => onExpandedChange(!expanded)}
        ref={ref}
        {...props}
      >
        {children ? children : expanded ? "Collapse" : "Expand"}
      </SidenavItem>
    );
  },
);

SidenavToggle.displayName = "@optiaxiom/react/SidenavToggle";
