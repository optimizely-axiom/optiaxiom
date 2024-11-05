import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useComboboxContext } from "../combobox-context";
import { ComboboxMultipleValue } from "../combobox-multiple-value";
import { ComboboxSingleValue } from "../combobox-single-value";

type ComboboxValueProps =
  | ComponentPropsWithoutRef<typeof ComboboxMultipleValue>
  | ComponentPropsWithoutRef<typeof ComboboxSingleValue>;

export const ComboboxValue = forwardRef<HTMLDivElement, ComboboxValueProps>(
  ({ placeholder, ...props }, ref) => {
    const { mode } = useComboboxContext("ComboboxValue");
    const Comp =
      mode === "single" ? ComboboxSingleValue : ComboboxMultipleValue;

    return <Comp placeholder={placeholder} ref={ref} {...props} />;
  },
);

ComboboxValue.displayName = "@optiaxiom/react/ComboboxValue";
