import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxSingleValue } from "../combobox-single-value";

type ComboboxValueProps = ComponentPropsWithoutRef<typeof ComboboxSingleValue>;

export const ComboboxValue = forwardRef<HTMLDivElement, ComboboxValueProps>(
  ({ children, placeholder, ...props }, ref) => {
    return (
      <ComboboxSingleValue placeholder={placeholder} ref={ref} {...props}>
        {children}
      </ComboboxSingleValue>
    );
  },
);

ComboboxValue.displayName = "@optiaxiom/react/ComboboxValue";
