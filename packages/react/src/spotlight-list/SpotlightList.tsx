import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandList } from "../command-list";

type SpotlightListProps = ComponentPropsWithoutRef<typeof CommandList>;

export const SpotlightList = forwardRef<HTMLDivElement, SpotlightListProps>(
  (props, ref) => {
    return <CommandList gap="xs" pb="lg" ref={ref} {...props} />;
  },
);

SpotlightList.displayName = "@optiaxiom/react/SpotlightList";
