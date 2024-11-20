import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxEmpty } from "../listbox-empty";

type ComboboxEmptyProps = ComponentPropsWithoutRef<typeof ListboxEmpty>;

export const ComboboxEmpty = forwardRef<HTMLDivElement, ComboboxEmptyProps>(
  (props, ref) => {
    return <ListboxEmpty ref={ref} {...props} />;
  },
);

ComboboxEmpty.displayName = "@optiaxiom/react/ComboboxEmpty";
