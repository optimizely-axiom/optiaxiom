import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxSeparator } from "../listbox-separator";

type SelectSeparatorProps = ComponentPropsWithoutRef<typeof ListboxSeparator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  (props, ref) => {
    return <ListboxSeparator ref={ref} {...props} />;
  },
);

SelectSeparator.displayName = "@optiaxiom/react/SelectSeparator";
