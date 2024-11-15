import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useMemo, useState } from "react";

import { CommandContextProvider } from "../command-context";

type CommandProps<Item> = {
  children: ReactNode;
  inputValue?: string;
  itemToSubItems?: (value: Item) => Item[] | null;
  onInputValueChange?: (inputValue: string) => void;
  onItemSelect?: (value: Item) => void;
  value?: Item[] | Set<Item>;
} & Pick<
  UseComboboxProps<Item>,
  "isItemDisabled" | "items" | "itemToKey" | "itemToString"
>;

export function Command<Item>({
  children,
  inputValue: inputValueProp,
  isItemDisabled = () => false,
  items,
  itemToKey = (value) => value,
  itemToString = (value) => (value ? String(value) : ""),
  itemToSubItems,
  onInputValueChange,
  onItemSelect,
  value: valueProp,
}: CommandProps<Item>) {
  const value = useMemo(
    () => (Array.isArray(valueProp) ? new Set(valueProp) : valueProp),
    [valueProp],
  );

  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });
  const [highlightedSubIndex, setHighlightedSubIndex] = useState(-1);

  const downshift = useCombobox({
    inputValue,
    isItemDisabled,
    isOpen: true,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange({ highlightedIndex }) {
      if (
        highlightedIndex !== -1 &&
        itemToSubItems?.(items[highlightedIndex])?.length
      ) {
        setHighlightedSubIndex(0);
      } else {
        setHighlightedSubIndex(-1);
      }
    },
    onSelectedItemChange({ selectedItem, type }) {
      if (type !== useCombobox.stateChangeTypes.InputBlur) {
        onItemSelect?.(selectedItem);
      }
    },
    selectedItem: null,
    stateReducer(state, actionAndChanges) {
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
    },
  });

  return (
    <CommandContextProvider
      downshift={downshift}
      highlightedItem={items[downshift.highlightedIndex]}
      highlightedSubIndex={highlightedSubIndex}
      isItemDisabled={isItemDisabled}
      items={items}
      itemToSubItems={itemToSubItems}
      setHighlightedSubIndex={setHighlightedSubIndex}
      setInputValue={setInputValue}
      value={value}
    >
      {children}
    </CommandContextProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
