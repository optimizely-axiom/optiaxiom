import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useComboboxContext } from "../combobox-context";
import { Command } from "../command";
import { useFieldContext } from "../field-context";
import { PopoverContent } from "../popover-content";

type ComboboxContentProps = ComponentPropsWithoutRef<typeof PopoverContent>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, ...props }, ref) => {
    const { labelId } = useFieldContext();
    const {
      isItemDisabled,
      items,
      itemToKey,
      itemToString,
      onInputValueChange,
      onItemSelect,
    } = useComboboxContext("ComboboxContent");

    return (
      <PopoverContent
        aria-labelledby={labelId}
        overflow="hidden"
        p="4"
        ref={ref}
        {...props}
      >
        <Command
          isItemDisabled={isItemDisabled}
          items={items}
          itemToKey={itemToKey}
          itemToString={itemToString}
          onInputValueChange={onInputValueChange}
          onItemSelect={onItemSelect}
        >
          {children}
        </Command>
      </PopoverContent>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
