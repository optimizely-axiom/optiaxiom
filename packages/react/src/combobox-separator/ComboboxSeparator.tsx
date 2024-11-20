import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxSeparator } from "../listbox-separator";

type ComboboxSeparatorProps = ComponentPropsWithoutRef<typeof ListboxSeparator>;

export const ComboboxSeparator = forwardRef<
  HTMLDivElement,
  ComboboxSeparatorProps
>((props, ref) => {
  return <ListboxSeparator ref={ref} {...props} />;
});

ComboboxSeparator.displayName = "@optiaxiom/react/ComboboxSeparator";
