import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ComboboxDialogContent } from "../combobox-dialog-content";
import type { ComboboxPopoverContent } from "../combobox-popover-content";

import { useComboboxContext } from "../combobox-context";
import { ComboboxInput } from "../combobox-input";
import { ComboboxListbox } from "../combobox-listbox";
import { Command } from "../command";
import { useFieldContext } from "../field-context";
import { useResponsiveMatches } from "../use-responsive-matches";

type ComboboxContentProps =
  | ComponentPropsWithoutRef<typeof ComboboxDialogContent>
  | ComponentPropsWithoutRef<typeof ComboboxPopoverContent>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, ...props }, ref) => {
    const p = useResponsiveMatches({
      base: "8",
      sm: "4",
    });

    const { labelId } = useFieldContext();
    const {
      components,
      inputValue,
      isItemDisabled,
      isItemSelected,
      items,
      itemToLabel,
      onInputValueChange,
      onItemSelect,
    } = useComboboxContext("@optiaxiom/react/ComboboxContent");

    return (
      <components.Content
        aria-labelledby={labelId}
        overflow="hidden"
        p={p}
        ref={ref}
        {...props}
      >
        <Command
          inputValue={inputValue}
          isItemDisabled={isItemDisabled}
          isItemSelected={isItemSelected}
          items={items}
          itemToLabel={itemToLabel}
          onInputValueChange={onInputValueChange}
          onItemSelect={onItemSelect}
        >
          {children ?? (
            <>
              <ComboboxInput placeholder="Search..." />
              <ComboboxListbox />
            </>
          )}
        </Command>
      </components.Content>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
