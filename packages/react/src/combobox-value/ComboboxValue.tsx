import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { ComboboxMultipleValue } from "../combobox-multiple-value";
import { ComboboxSingleValue } from "../combobox-single-value";

type ComboboxValueProps =
  | ({
      type: "multiple";
    } & ComponentPropsWithoutRef<typeof ComboboxMultipleValue>)
  | ({
      type?: "single";
    } & ComponentPropsWithoutRef<typeof ComboboxSingleValue>);

export const ComboboxValue = forwardRef<HTMLDivElement, ComboboxValueProps>(
  (props, ref) => {
    return props.type === "multiple" ? (
      <ComboboxMultipleValue ref={ref} {...props} />
    ) : (
      <ComboboxSingleValue ref={ref} {...props} />
    );
  },
);

ComboboxValue.displayName = "@optiaxiom/react/ComboboxValue";
