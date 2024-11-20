import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxLabel } from "../listbox-label";

type ComboboxLabelProps = ComponentPropsWithoutRef<typeof ListboxLabel>;

export const ComboboxLabel = forwardRef<HTMLDivElement, ComboboxLabelProps>(
  (props, ref) => {
    return <ListboxLabel ref={ref} {...props} />;
  },
);

ComboboxLabel.displayName = "@optiaxiom/react/ComboboxLabel";
