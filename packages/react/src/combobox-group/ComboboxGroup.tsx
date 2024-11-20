import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxGroup } from "../listbox-group";

type ComboboxGroupProps = ComponentPropsWithoutRef<typeof ListboxGroup>;

export const ComboboxGroup = forwardRef<HTMLDivElement, ComboboxGroupProps>(
  (props, ref) => {
    return <ListboxGroup ref={ref} {...props} />;
  },
);

ComboboxGroup.displayName = "@optiaxiom/react/ComboboxGroup";
