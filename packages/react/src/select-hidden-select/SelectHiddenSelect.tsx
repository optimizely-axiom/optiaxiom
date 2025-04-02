import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react";

import { useSelectContext } from "../select-context";
import { useEffectEvent } from "../use-event";

export const SelectHiddenSelect = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select">
>(({ defaultValue, disabled, name, onChange, required, value }, ref) => {
  const { items, itemToValue } = useSelectContext(
    "@optiaxiom/react/SelectHiddenSelect",
  );

  const itemToValueStable = useEffectEvent(itemToValue);
  const options = useMemo(
    () =>
      items.map((item) => (
        <option key={itemToValueStable(item)} value={itemToValueStable(item)}>
          {itemToValueStable(item)}
        </option>
      )),
    [itemToValueStable, items],
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
        {options}
      </select>
    </VisuallyHidden>
  );
});

SelectHiddenSelect.displayName = "@optiaxiom/react/SelectHiddenSelect";
