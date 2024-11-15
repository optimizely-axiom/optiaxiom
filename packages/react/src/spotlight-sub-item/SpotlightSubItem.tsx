import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Badge } from "../badge";
import { CommandSubItem } from "../command-sub-item";
import * as styles from "./SpotlightSubItem.css";

type SpotlightSubItemProps = ComponentPropsWithoutRef<typeof CommandSubItem>;

export const SpotlightSubItem = forwardRef<
  HTMLDivElement,
  SpotlightSubItemProps
>(({ active, children, className, ...props }, ref) => {
  return (
    <CommandSubItem
      active={active}
      asChild
      ref={ref}
      {...styles.item({ active: active || false }, className)}
      {...props}
    >
      <Badge
        intent={active ? "information" : "neutral"}
        variant={active ? "solid" : "light"}
      >
        {children}
      </Badge>
    </CommandSubItem>
  );
});

SpotlightSubItem.displayName = "@optiaxiom/react/SpotlightSubItem";
