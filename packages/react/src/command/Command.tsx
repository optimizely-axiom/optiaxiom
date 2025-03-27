import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useState } from "react";

import { CommandProvider } from "../command-context";
import { usePortalPatch } from "../downshift";

type CommandProps<Item> = Pick<
  UseComboboxProps<Item>,
  "inputId" | "stateReducer"
> & {
  children: ReactNode;
  /**
   * The input value in controlled mode.
   */
  inputValue?: string;
  /**
   * Return true if items need to be marked as disabled and skipped from keyboard navigation.
   */
  isItemDisabled?: UseComboboxProps<Item>["isItemDisabled"];
  /**
   * Return true if item need to be marked as selected.
   */
  isItemSelected?: (item: Item, index: number) => boolean;
  /**
   * The items we want to render.
   */
  items: UseComboboxProps<Item>["items"];
  /**
   * Return a string representation of items if they are objects. Needed to show selected values inside triggers.
   */
  itemToLabel?: UseComboboxProps<Item>["itemToString"];
  itemToSubItems?: (value: Item) => Item[] | null;
  /**
   * Handler that is called when input value changes.
   */
  onInputValueChange?: (inputValue: string) => void;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  onItemSelect?: (value: Item) => void;
};

export function Command<Item>({
  children,
  inputValue: inputValueProp,
  isItemDisabled = () => false,
  isItemSelected = () => false,
  items,
  itemToLabel = (value) => (value ? String(value) : ""),
  itemToSubItems,
  onInputValueChange,
  onItemSelect,
  ...props
}: CommandProps<Item>) {
  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });

  const [lastInteractionSource, setLastInteractionSource] = useState<
    "keyboard" | "pointer"
  >("pointer");

  const [highlightedIndex, setHighlightedIndex, placed, setPlaced] =
    usePortalPatch(() =>
      items.findIndex((item, index) => isItemSelected(item, index)),
    );
  const [highlightedSubIndex, setHighlightedSubIndex] = useState(-1);

  const downshift = useCombobox({
    ...props,
    highlightedIndex:
      highlightedIndex === -1
        ? items.findIndex((item, index) => !isItemDisabled(item, index))
        : highlightedIndex,
    inputValue,
    isItemDisabled,
    isOpen: placed,
    items,
    itemToString: itemToLabel,
    onHighlightedIndexChange({ highlightedIndex, type }) {
      if (type !== useCombobox.stateChangeTypes.MenuMouseLeave) {
        setHighlightedIndex(highlightedIndex);
      }

      if (
        type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
        type === useCombobox.stateChangeTypes.InputKeyDownArrowUp ||
        type === useCombobox.stateChangeTypes.InputKeyDownPageDown ||
        type === useCombobox.stateChangeTypes.InputKeyDownPageUp
      ) {
        setLastInteractionSource("keyboard");
      } else {
        setLastInteractionSource("pointer");
      }

      if (
        highlightedIndex !== -1 &&
        itemToSubItems?.(items[highlightedIndex])?.length
      ) {
        setHighlightedSubIndex(0);
      } else {
        setHighlightedSubIndex(-1);
      }
    },
    onIsOpenChange({ isOpen, type }) {
      if (isOpen) {
        if (
          type === useCombobox.stateChangeTypes.InputClick ||
          type === useCombobox.stateChangeTypes.ToggleButtonClick
        ) {
          setLastInteractionSource("pointer");
        } else {
          setLastInteractionSource("keyboard");
        }
      }
    },
    onSelectedItemChange({ selectedItem, type }) {
      if (type !== useCombobox.stateChangeTypes.InputBlur && selectedItem) {
        onItemSelect?.(selectedItem);
      }
    },
    selectedItem: null,
  });

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getMenuProps({}, { suppressRefError: true });

  return (
    <CommandProvider
      downshift={downshift}
      highlightedItem={items[downshift.highlightedIndex]}
      highlightedSubIndex={
        highlightedSubIndex === -1 &&
        items[downshift.highlightedIndex] &&
        itemToSubItems?.(items[downshift.highlightedIndex])?.length
          ? 0
          : highlightedSubIndex
      }
      isItemDisabled={isItemDisabled}
      isItemSelected={isItemSelected}
      items={items}
      itemToSubItems={itemToSubItems}
      lastInteractionSource={lastInteractionSource}
      setHighlightedIndex={(index, source) => {
        setHighlightedIndex(index);
        setLastInteractionSource(source);
      }}
      setHighlightedSubIndex={(index, source) => {
        setHighlightedSubIndex(index);
        setLastInteractionSource(source);
      }}
      setInputValue={setInputValue}
      setPlaced={setPlaced}
    >
      {children}
    </CommandProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
