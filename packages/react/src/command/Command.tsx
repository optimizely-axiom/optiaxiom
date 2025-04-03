import { useCombobox } from "downshift";
import { type ReactNode, useState } from "react";

import { CommandProvider } from "../command-context";
import { usePortalPatch } from "../downshift";
import { useCommandItems } from "../use-command-items";
import { useEffectEvent } from "../use-event";

type CommandProps<Item> = {
  children?: ReactNode;
  /**
   * Return true/false for filtering items with the given search input.
   */
  defaultFilter?: (item: Item, inputValue: string) => boolean;
  /**
   * The initial items we want to render in uncontrolled mode.
   */
  defaultItems?: Item[];
  /**
   * The input value in controlled mode.
   */
  inputValue?: string;
  /**
   * Return true if items need to be marked as disabled and skipped from keyboard navigation.
   */
  isItemDisabled?: (item: Item, index: number) => boolean;
  /**
   * Return true if item need to be marked as selected.
   */
  isItemSelected?: (item: Item, index: number) => boolean;
  /**
   * The items we want to render in controlled mode.
   */
  items?: Item[];
  /**
   * Return a string representation of items if they are objects.
   */
  itemToLabel?: (item: Item) => string;
  itemToSubItems?: (value: Item) => Item[] | undefined;
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
  defaultFilter,
  defaultItems,
  inputValue: inputValueProp,
  isItemDisabled = () => false,
  isItemSelected = () => false,
  items: itemsProp,
  itemToLabel = (value) => (value ? String(value) : ""),
  itemToSubItems,
  onInputValueChange,
  onItemSelect,
}: CommandProps<Item>) {
  const [items, inputValue, setInputValue] = useCommandItems({
    defaultFilter,
    defaultItems,
    inputValue: inputValueProp,
    items: itemsProp,
    itemToLabel,
    onInputValueChange,
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
    highlightedIndex:
      highlightedIndex === -1
        ? items.findIndex((item, index) => !isItemDisabled(item, index))
        : highlightedIndex,
    inputValue,
    isItemDisabled,
    isOpen: placed,
    items,
    itemToString: (item) => (item !== null ? itemToLabel(item) : ""),
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
      if (
        type !== useCombobox.stateChangeTypes.InputBlur &&
        selectedItem !== null
      ) {
        onItemSelect?.(selectedItem);
      }
    },
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
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

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getInputProps({}, { suppressRefError: true });
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
      itemToLabel={itemToLabel}
      itemToSubItems={itemToSubItems}
      lastInteractionSource={lastInteractionSource}
      placed={placed}
      setHighlightedIndex={(index, source) => {
        setHighlightedIndex(index);
        setLastInteractionSource(source);
      }}
      setHighlightedSubIndex={(index, source) => {
        setHighlightedSubIndex(index);
        setLastInteractionSource(source);
      }}
      setInputValue={useEffectEvent((newInputValue: string) => {
        if (inputValue === "" && newInputValue === "") {
          onInputValueChange?.("");
        } else {
          setInputValue(newInputValue);
        }
      })}
      setPlaced={setPlaced}
    >
      {children}
    </CommandProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
