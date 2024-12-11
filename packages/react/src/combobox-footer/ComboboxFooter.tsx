import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxFooter } from "../listbox-footer";

type ComboboxFooterProps = ComponentPropsWithoutRef<typeof ListboxFooter>;

export const ComboboxFooter = forwardRef<HTMLDivElement, ComboboxFooterProps>(
  (props, ref) => {
    return <ListboxFooter ref={ref} {...props} />;
  },
);

ComboboxFooter.displayName = "@optiaxiom/react/ComboboxFooter";
