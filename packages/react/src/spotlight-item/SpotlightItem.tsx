import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandItem } from "../command-item";

type SpotlightItemProps = ComponentPropsWithoutRef<typeof CommandItem>;

export const SpotlightItem = forwardRef<HTMLDivElement, SpotlightItemProps>(
  (props, ref) => <CommandItem ref={ref} {...props} />,
);

SpotlightItem.displayName = "@optiaxiom/react/SpotlightItem";
