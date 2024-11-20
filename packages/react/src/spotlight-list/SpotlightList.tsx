import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandListbox } from "../command-listbox";

type SpotlightListProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const SpotlightList = forwardRef<HTMLDivElement, SpotlightListProps>(
  (props, ref) => {
    return <CommandListbox gap="xs" pb="lg" ref={ref} {...props} />;
  },
);

SpotlightList.displayName = "@optiaxiom/react/SpotlightList";
