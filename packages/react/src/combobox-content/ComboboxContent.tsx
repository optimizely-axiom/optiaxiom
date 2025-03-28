import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ComboboxDialogContent } from "../combobox-dialog-content";
import type { ComboboxPopoverContent } from "../combobox-popover-content";

import { useComboboxContext } from "../combobox-context";
import { ComboboxEmpty } from "../combobox-empty";
import { ComboboxInput } from "../combobox-input";
import { ComboboxScrollArea } from "../combobox-scroll-area";
import { Command } from "../command";
import { CommandListbox } from "../command-listbox";
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
          <CommandListbox>
            {children ?? (
              <>
                <ComboboxInput placeholder="Search..." />
                <ComboboxScrollArea />
                {items.length === 0 && (
                  <ComboboxEmpty>No result found</ComboboxEmpty>
                )}
              </>
            )}
          </CommandListbox>
        </Command>
      </components.Content>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
