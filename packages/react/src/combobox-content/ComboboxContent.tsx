import { useCombobox } from "downshift";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { useComboboxContext } from "../combobox-context";
import { Command } from "../command";
import { DialogContent } from "../dialog-content";
import { useFieldContext } from "../field-context";
import { PopoverContent } from "../popover-content";
import { useResponsiveMatches } from "../use-responsive-matches";

type ComboboxContentProps = ComponentPropsWithoutRef<
  typeof DialogContent | typeof PopoverContent
>;

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  ({ children, size: _size, ...props }, ref) => {
    const p = useResponsiveMatches({
      base: "8",
      sm: "4",
    });

    const { labelId } = useFieldContext();
    const {
      components,
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
          {children}
        </Command>
      </components.Content>
    );
  },
);

ComboboxContent.displayName = "@optiaxiom/react/ComboboxContent";
