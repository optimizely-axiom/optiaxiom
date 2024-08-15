import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Checkbox } from "../checkbox";
import { CommandItem } from "../command-item";

type CommandCheckboxItemProps = BoxProps<
  typeof CommandItem,
  {
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
>;

export const CommandCheckboxItem = forwardRef<
  HTMLDivElement,
  CommandCheckboxItemProps
>(({ checked, children, disabled, onCheckedChange, ...props }, ref) => {
  const handleChange = (newChecked: boolean) => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(newChecked);
    }
  };

  return (
    <CommandItem
      data-disabled={disabled ? "" : undefined}
      data-selected={checked ? "" : undefined}
      disabled={disabled}
      onSelect={() => handleChange(!checked)}
      ref={ref}
      {...props}
    >
      <Box alignItems="center" display="flex" w="full">
        <Checkbox checked={checked} disabled={disabled} />
        <Box mt="2">{children}</Box>
      </Box>
    </CommandItem>
  );
});

CommandCheckboxItem.displayName = "@optiaxiom/react/CommandCheckboxItem";
