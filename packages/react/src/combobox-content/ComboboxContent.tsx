import { useCombobox } from "downshift";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ComboboxDialogContent } from "../combobox-dialog-content";
import type { ComboboxPopoverContent } from "../combobox-popover-content";

import { useComboboxContext } from "../combobox-context";
import { Command } from "../command";
import { useFieldContext } from "../field-context";
import { useResponsiveMatches } from "../use-responsive-matches";
import { ComboboxContentImpl } from "./ComboboxContentImpl";

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
      items,
      itemToKey,
      itemToString,
      onInputValueChange,
      onItemSelect,
      value,
    } = useComboboxContext("ComboboxContent");

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
          items={items}
          itemToKey={itemToKey}
          itemToString={itemToString}
          onInputValueChange={onInputValueChange}
          onItemSelect={onItemSelect}
          open
          selectedItem={null}
          stateReducer={(state, actionAndChanges) => {
            const { changes, type } = actionAndChanges;

            switch (type) {
              case useCombobox.stateChangeTypes.InputKeyDownEnter:
              case useCombobox.stateChangeTypes.ItemClick:
                return {
                  ...changes,
                  /**
                   * Keep the selected option highlighted rather than resetting to -1
                   */
                  highlightedIndex: state.highlightedIndex,
                };
              default:
                return changes;
            }
          }}
          value={value}
        >
          <ComboboxContentImpl>{children}</ComboboxContentImpl>
        </Command>
      </components.Content>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
