import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Badge } from "../badge";
import { CommandSubItem } from "../command-sub-item";
import * as styles from "./SpotlightSubItem.css";

type SpotlightSubItemProps = ComponentPropsWithoutRef<typeof CommandSubItem>;

export const SpotlightSubItem = forwardRef<
  HTMLDivElement,
  SpotlightSubItemProps
>(({ children, className, selected, ...props }, ref) => {
  return (
    <CommandSubItem
      asChild
      ref={ref}
      selected={selected}
      {...styles.item({ active: selected || false }, className)}
      {...props}
    >
      <Badge
        intent={selected ? "information" : "neutral"}
        variant={selected ? "solid" : "light"}
      >
        {children}
      </Badge>
    </CommandSubItem>
  );
});

SpotlightSubItem.displayName = "@optiaxiom/react/SpotlightSubItem";
