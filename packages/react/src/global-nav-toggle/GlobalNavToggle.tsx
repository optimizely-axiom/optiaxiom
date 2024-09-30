import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { useGlobalNavContext } from "../global-nav-context";
import { GlobalNavItem } from "../global-nav-item";

export type GlobalNavToggleProps = ComponentPropsWithRef<typeof GlobalNavItem>;

export const GlobalNavToggle = forwardRef<
  HTMLButtonElement,
  GlobalNavToggleProps
>(({ children, ...props }, ref) => {
  const { expanded } = useGlobalNavContext("GlobalNavItem");
  return (
    <RadixCollapsible.Trigger asChild ref={ref} {...props}>
      <GlobalNavItem>
        {children ? children : expanded ? "Collapse" : "Expand"}
      </GlobalNavItem>
    </RadixCollapsible.Trigger>
  );
});

GlobalNavToggle.displayName = "@optiaxiom/react/GlobalNavToggle";
