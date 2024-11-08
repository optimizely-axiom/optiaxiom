import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandEmpty } from "../command-empty";

type SpotlightEmptyProps = ComponentPropsWithoutRef<typeof CommandEmpty>;

export const SpotlightEmpty = forwardRef<HTMLDivElement, SpotlightEmptyProps>(
  (props, ref) => {
    return <CommandEmpty fontSize="lg" gap="sm" p="xl" ref={ref} {...props} />;
  },
);

SpotlightEmpty.displayName = "@optiaxiom/react/SpotlightEmpty";
