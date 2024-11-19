import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxSeparator } from "../listbox-separator";

type SelectSeparatorProps = ComponentPropsWithoutRef<typeof ListboxSeparator>;

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  (props, ref) => <ListboxSeparator ref={ref} {...props} />,
);

SelectSeparator.displayName = "@optiaxiom/react/SelectSeparator";
