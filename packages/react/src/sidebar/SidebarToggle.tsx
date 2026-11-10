import { type ComponentPropsWithRef, forwardRef } from "react";

import { useMessages } from "../locale";
import { NavItem } from "../nav";
import { useSidebarContext } from "./SidebarContext";

export type SidebarToggleProps = Omit<
  ComponentPropsWithRef<typeof NavItem>,
  "aria-label"
> & {
  "aria-label"?: string;
};

/**
 * @group Sidebar
 */
export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ "aria-label": ariaLabel, children, ...props }, ref) => {
    const messages = useMessages();
    const { expanded, navId, onExpandedChange } = useSidebarContext(
      "@optiaxiom/react/SidebarToggle",
    );

    return (
      <NavItem
        aria-controls={navId}
        aria-expanded={expanded ? "true" : "false"}
        aria-label={
          ariaLabel || (expanded ? messages["Collapse"] : messages["Expand"])
        }
        onClick={() => onExpandedChange(!expanded)}
        ref={ref}
        {...props}
      >
        {children ?? messages["Collapse"]}
      </NavItem>
    );
  },
);

SidebarToggle.displayName = "@optiaxiom/react/SidebarToggle";
