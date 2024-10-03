import { Popover } from "@radix-ui/react-popover";
import { type UseComboboxProps, useCombobox } from "downshift";

import { AutocompleteContextProvider } from "../autocomplete-context";
import { type BoxProps } from "../box";
import { useFieldContext } from "../field-context";

type AutocompleteProps<Item> = BoxProps<
  typeof Popover,
  {
    defaultOpen?: never;
    disabled?: boolean;
    onValueChange?: (value: Item) => void;
    value?: Item;
  } & Pick<
    UseComboboxProps<Item>,
    | "initialHighlightedIndex"
    | "isItemDisabled"
    | "itemToKey"
    | "itemToString"
    | "items"
    | "onInputValueChange"
  >
>;

const properties = [
  "initialHighlightedIndex",
  "isItemDisabled",
  "itemToKey",
  "itemToString",
  "items",
  "onInputValueChange",
] as const;

export function extractDownshift<Item>(props: Item) {
  const downshiftProps = {} as Pick<
    Item,
    (typeof properties)[number] & keyof Item
  >;
  const restProps = {} as Omit<Item, (typeof properties)[number]>;

  // @ts-expect-error -- too complex
  for (const [name, value] of Object.entries(props)) {
    if (properties.includes(name as never)) {
      // @ts-expect-error -- too complex
      downshiftProps[name] = value;
    } else {
      // @ts-expect-error -- too complex
      restProps[name] = value;
    }
  }

  return { downshiftProps, restProps };
}
export function Autocomplete<Item>({
  children,
  disabled,
  items,
  onInputValueChange,
  onValueChange,
  value,
  ...props
}: AutocompleteProps<Item>) {
  const { downshiftProps, restProps } = extractDownshift(props);
  const { id: inputId } = useFieldContext({});
  const downshift = useCombobox({
    ...downshiftProps,
    initialSelectedItem: value,
    inputId,
    items,
    onInputValueChange(changes) {
      onInputValueChange?.({
        ...changes,
        inputValue: changes.isOpen ? changes.inputValue : "",
      });
    },
    onSelectedItemChange({ selectedItem }) {
      onValueChange?.(selectedItem);
    },
    onStateChange({ type }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          downshift.selectItem(downshift.selectedItem);
          break;
      }
    },
  });
  const highlightedItem = items[downshift.highlightedIndex];
  return (
    <Popover {...restProps}>
      <AutocompleteContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={highlightedItem}
        items={items}
      >
        {children}
      </AutocompleteContextProvider>
    </Popover>
  );
}

Autocomplete.displayName = "@optiaxiom/react/Autocomplete";
