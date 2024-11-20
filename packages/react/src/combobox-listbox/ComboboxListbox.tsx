import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { CommandListbox } from "../command-listbox";

type ComboboxListboxProps = ComponentPropsWithoutRef<typeof CommandListbox>;

export const ComboboxListbox = forwardRef<HTMLDivElement, ComboboxListboxProps>(
  (props, ref) => <CommandListbox ref={ref} {...props} />,
);

ComboboxListbox.displayName = "@optiaxiom/react/ComboboxListbox";
