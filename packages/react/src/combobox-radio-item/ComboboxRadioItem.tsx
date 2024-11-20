import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxItem } from "../combobox-item";
import { ListboxRadioItem } from "../listbox-radio-item";

type ComboboxRadioItemProps = ComponentPropsWithoutRef<typeof ComboboxItem> &
  ComponentPropsWithoutRef<typeof ListboxRadioItem>;

export const ComboboxRadioItem = forwardRef<
  HTMLDivElement,
  ComboboxRadioItemProps
>(({ children, ...props }, ref) => {
  return (
    <ComboboxItem asChild ref={ref} {...props}>
      <ListboxRadioItem>{children}</ListboxRadioItem>
    </ComboboxItem>
  );
});

ComboboxRadioItem.displayName = "@optiaxiom/react/ComboboxRadioItem";
