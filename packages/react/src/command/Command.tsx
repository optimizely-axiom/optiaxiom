import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox, type UseComboboxProps } from "downshift";
import { type ReactNode, useMemo, useState } from "react";

import { CommandContextProvider } from "../command-context";
import { usePortalPatch } from "../downshift";

type CommandProps<Item> = Pick<
  UseComboboxProps<Item>,
  "inputId" | "selectedItem" | "stateReducer"
> & {
  /**
   * Return true if items need to be marked as disabled and skipped from keyboard navigation.
   */
  isItemDisabled?: UseComboboxProps<Item>["isItemDisabled"];
  /**
   * The items we want to render.
   */
  items: UseComboboxProps<Item>["items"];
  /**
   * Return a unique key for each item when the object reference will change during renders.
   */
  itemToKey?: UseComboboxProps<Item>["itemToKey"];
  /**
   * Return a string representation of items if they are objects. Needed to show selected values inside triggers.
   */
  itemToString?: UseComboboxProps<Item>["itemToString"];
} & {
  children: ReactNode;
  inputValue?: string;
  itemToSubItems?: (value: Item) => Item[] | null;
  onInputValueChange?: (inputValue: string) => void;
  onItemSelect?: (value: Item) => void;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  value?: Item[] | Set<Item>;
};

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
  onOpenChange,
  open,
  value: valueProp,
  ...props
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

  const [lastInteractionSource, setLastInteractionSource] = useState<
    "keyboard" | "pointer"
  >("keyboard");

  const [highlightedIndex, setHighlightedIndex] = usePortalPatch(open);
  const [highlightedSubIndex, setHighlightedSubIndex] = useState(-1);

  const downshift = useCombobox({
    ...props,
    highlightedIndex,
    inputValue,
    isItemDisabled,
    isOpen: open,
    items,
    itemToKey,
    itemToString,
    onHighlightedIndexChange({ highlightedIndex, type }) {
      setHighlightedIndex(highlightedIndex);

      if (
        type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
        type === useCombobox.stateChangeTypes.InputKeyDownArrowUp
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
    onIsOpenChange({ isOpen }) {
      onOpenChange?.(isOpen);
    },
    onSelectedItemChange({ selectedItem, type }) {
      if (type !== useCombobox.stateChangeTypes.InputBlur) {
        onItemSelect?.(selectedItem);
      }
    },
  });

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getMenuProps({}, { suppressRefError: true });

  return (
    <CommandContextProvider
      downshift={downshift}
      highlightedItem={items[downshift.highlightedIndex]}
      highlightedSubIndex={highlightedSubIndex}
      isItemDisabled={isItemDisabled}
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
      value={value}
    >
      {children}
    </CommandContextProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
