import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxEmpty } from "../listbox-empty";

type SpotlightEmptyProps = ComponentPropsWithoutRef<typeof ListboxEmpty>;

export const SpotlightEmpty = forwardRef<HTMLDivElement, SpotlightEmptyProps>(
  (props, ref) => {
    return <ListboxEmpty fontSize="lg" gap="sm" p="xl" ref={ref} {...props} />;
  },
);

SpotlightEmpty.displayName = "@optiaxiom/react/SpotlightEmpty";
