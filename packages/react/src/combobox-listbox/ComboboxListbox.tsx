import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxRadioItem } from "../combobox-radio-item";
import { useCommandContext } from "../command-context";
import { CommandListbox } from "../command-listbox";

type ComboboxListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const ComboboxListbox = forwardRef<HTMLDivElement, ComboboxListboxProps>(
  ({ children, ...props }, ref) => {
    const { itemToLabel } = useCommandContext(
      "@optiaxiom/react/ComboboxListbox",
    );

    return (
      <CommandListbox ref={ref} tabIndex={-1} {...props}>
        {children ??
          ((item) => (
            <ComboboxRadioItem item={item}>
              {itemToLabel(item)}
            </ComboboxRadioItem>
          ))}
      </CommandListbox>
    );
  },
);

ComboboxListbox.displayName = "@optiaxiom/react/ComboboxListbox";
