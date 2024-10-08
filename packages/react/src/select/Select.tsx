import { Popover } from "@radix-ui/react-popover";
import { type UseSelectProps, useSelect } from "downshift";

import { extractDownshift } from "../autocomplete";
import { type BoxProps } from "../box";
import { useFieldContext } from "../field-context";
import { SelectContextProvider } from "../select-context";

type SelectProps<Item> = BoxProps<
  typeof Popover,
  {
    defaultOpen?: never;
    disabled?: boolean;
    onValueChange?: (value: Item) => void;
    value?: Item;
  } & Pick<
    UseSelectProps<Item>,
    | "initialHighlightedIndex"
    | "isItemDisabled"
    | "itemToKey"
    | "itemToString"
    | "items"
  >
>;

export function Select<Item>({
  children,
  disabled,
  items,
  onValueChange,
  value,
  ...props
}: SelectProps<Item>) {
  const { downshiftProps, restProps } = extractDownshift(props);
  const { id: toggleButtonId } = useFieldContext();

  const downshift = useSelect({
    ...downshiftProps,
    initialSelectedItem: value,
    items,
    onSelectedItemChange({ selectedItem }) {
      onValueChange?.(selectedItem);
    },
    toggleButtonId,
  });

  const highlightedItem = items[downshift.highlightedIndex];

  return (
    <Popover {...restProps}>
      <SelectContextProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={highlightedItem}
        items={items}
      >
        {children}
      </SelectContextProvider>
    </Popover>
  );
}

Select.displayName = "@optiaxiom/react/Select";
