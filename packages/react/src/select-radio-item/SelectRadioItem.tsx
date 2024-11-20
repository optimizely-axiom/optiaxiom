import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxRadioItem } from "../listbox-radio-item";
import { SelectItem } from "../select-item";

type SelectRadioItemProps = ComponentPropsWithoutRef<typeof ListboxRadioItem> &
  ComponentPropsWithoutRef<typeof SelectItem>;

export const SelectRadioItem = forwardRef<HTMLDivElement, SelectRadioItemProps>(
  ({ children, ...props }, ref) => {
    return (
      <SelectItem asChild ref={ref} {...props}>
        <ListboxRadioItem>{children}</ListboxRadioItem>
      </SelectItem>
    );
  },
);

SelectRadioItem.displayName = "@optiaxiom/react/SelectRadioItem";
