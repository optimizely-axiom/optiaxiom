import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxLabel } from "../listbox-label";

type SelectLabelProps = ComponentPropsWithoutRef<typeof ListboxLabel>;

export const SelectLabel = forwardRef<HTMLDivElement, SelectLabelProps>(
  (props, ref) => {
    return <ListboxLabel ref={ref} {...props} />;
  },
);

SelectLabel.displayName = "@optiaxiom/react/SelectLabel";
