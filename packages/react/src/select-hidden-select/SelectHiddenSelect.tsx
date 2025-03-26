import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useSelectContext } from "../select-context";

export const SelectHiddenSelect = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select">
>(({ defaultValue, disabled, name, onChange, required, value }, ref) => {
  const { items, itemToLabel, itemToValue } = useSelectContext(
    "@optiaxiom/react/SelectHiddenSelect",
  );

  return (
    <VisuallyHidden aria-hidden>
      <select
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        onChange={onChange}
        ref={ref}
        required={required}
        tabIndex={-1}
        value={value}
      >
        <option value=""></option>
        {items.map((item) => (
          <option key={itemToValue(item)} value={itemToValue(item)}>
            {itemToLabel(item)}
          </option>
        ))}
      </select>
    </VisuallyHidden>
  );
});

SelectHiddenSelect.displayName = "@optiaxiom/react/SelectHiddenSelect";
