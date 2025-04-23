import { type ComponentPropsWithoutRef, forwardRef, useMemo } from "react";

import { VisuallyHidden } from "../visually-hidden";
import { useSelectContext } from "./SelectContext";

export const SelectHiddenSelect = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<"select">
>(({ defaultValue, disabled, name, onChange, required, value }, ref) => {
  const { items } = useSelectContext("@optiaxiom/react/SelectHiddenSelect");

  const options = useMemo(
    () =>
      items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.value}
        </option>
      )),
    [items],
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
