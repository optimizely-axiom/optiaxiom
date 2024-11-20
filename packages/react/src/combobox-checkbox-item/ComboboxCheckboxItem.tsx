import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxItem } from "../combobox-item";
import { ListboxCheckboxItem } from "../listbox-checkbox-item";

type ComboboxCheckboxItemProps = ComponentPropsWithoutRef<typeof ComboboxItem> &
  ComponentPropsWithoutRef<typeof ListboxCheckboxItem>;

export const ComboboxCheckboxItem = forwardRef<
  HTMLDivElement,
  ComboboxCheckboxItemProps
>(({ children, ...props }, ref) => {
  return (
    <ComboboxItem asChild ref={ref} {...props}>
      <ListboxCheckboxItem>{children}</ListboxCheckboxItem>
    </ComboboxItem>
  );
});

ComboboxCheckboxItem.displayName = "@optiaxiom/react/ComboboxCheckboxItem";
