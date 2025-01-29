import { type ComponentPropsWithRef, forwardRef } from "react";

import { NavItem } from "../nav-item";
import { useSidebarContext } from "../sidebar-context";

export type SidebarToggleProps = Omit<
  ComponentPropsWithRef<typeof NavItem>,
  "aria-label"
> & {
  "aria-label"?: string;
};

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ "aria-label": ariaLabel, children, ...props }, ref) => {
    const { expanded, onExpandedChange } = useSidebarContext("SidebarToggle");
    return (
      <NavItem
        aria-label={ariaLabel || (expanded ? "Collapse" : "Expand")}
        fontWeight="400"
        onClick={() => onExpandedChange(!expanded)}
        ref={ref}
        {...props}
      >
        {children ?? "Collapse"}
      </NavItem>
    );
  },
);

SidebarToggle.displayName = "@optiaxiom/react/SidebarToggle";
