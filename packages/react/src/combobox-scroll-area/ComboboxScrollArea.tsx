import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ListboxScrollArea } from "../listbox-scroll-area";

type ComboboxScrollAreaProps = ComponentPropsWithoutRef<
  typeof ListboxScrollArea
>;

export const ComboboxScrollArea = forwardRef<
  HTMLDivElement,
  ComboboxScrollAreaProps
>((props, ref) => {
  return <ListboxScrollArea ref={ref} {...props} />;
});

ComboboxScrollArea.displayName = "@optiaxiom/react/ComboboxScrollArea";
