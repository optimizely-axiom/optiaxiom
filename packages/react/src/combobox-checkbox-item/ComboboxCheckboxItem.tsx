import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Checkbox } from "../checkbox";
import { useComboboxContext } from "../combobox-context";
import { ComboboxItem } from "../combobox-item";

type ComboboxCheckboxItemProps = {
  onCheckedChange?: (checked: boolean) => void;
} & Omit<BoxProps<typeof ComboboxItem>, "onSelect">;

export const ComboboxCheckboxItem = forwardRef<
  HTMLDivElement,
  ComboboxCheckboxItemProps
>(({ children, disabled, onCheckedChange, value, ...props }, ref) => {
  const {
    mode,
    setValue,
    value: contextValue,
  } = useComboboxContext("ComboboxContext");

  const isChecked = Array.isArray(contextValue)
    ? contextValue.includes(value)
    : contextValue === value;

  const handleChange = () => {
    const newChecked = !isChecked;
    if (mode === "multiple") {
      if (Array.isArray(contextValue)) {
        setValue(
          newChecked
            ? [...contextValue, value]
            : contextValue.filter((v) => v !== value),
        );
      } else {
        setValue([value]);
      }
    } else {
      setValue(newChecked ? value : "");
    }

    if (onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <ComboboxItem
      data-disabled={disabled ? "" : undefined}
      data-selected={isChecked ? "" : undefined}
      disabled={disabled}
      onSelect={handleChange}
      ref={ref}
      value={value}
      {...props}
    >
      <Box alignItems="center" display="flex" w="full">
        <Checkbox
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
        />
        <Box mt="2">{children}</Box>
      </Box>
    </ComboboxItem>
  );
});

ComboboxCheckboxItem.displayName = "@optiaxiom/react/ComboboxCheckboxItem";
