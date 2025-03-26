import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect } from "downshift";
import { type ReactNode } from "react";

import { usePortalPatch } from "../downshift";
import { SelectProvider } from "../select-context";

type SelectProps<Item> = (NoInfer<Item> extends string
  ? {
      defaultValue?: NoInfer<Item> | null;
      itemToValue?: (
        item: NoInfer<Item> | null,
      ) => NoInfer<Item> | null | undefined;
      onValueChange?: (value: NoInfer<Item> | null) => void;
      value?: NoInfer<Item> | null;
    }
  : {
      defaultValue?: null | string;
      itemToValue: (item: NoInfer<Item> | null) => null | string | undefined;
      onValueChange?: (value: null | string) => void;
      value?: null | string;
    }) & {
  children?: ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  isItemDisabled?: (item: NoInfer<Item>, index: number) => boolean;
  items: Item[];
  itemToLabel?: (item: NoInfer<Item> | null) => string;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
};

export function Select<Item>({
  children,
  defaultOpen = false,
  defaultValue,
  disabled,
  items,
  itemToLabel = (value) => (value ? String(value) : ""),
  itemToValue = (item: unknown) =>
    typeof item === "string" ? item : undefined,
  onOpenChange,
  onValueChange,
  open,
  value: valueProp,
  ...props
}: SelectProps<Item>) {
  const [value, setValue] = useControllableState({
    defaultProp: defaultValue,
    onChange: onValueChange as (value: null | string) => void,
    prop: valueProp,
  });
  const selectedItem = value
    ? items.find((item) => itemToValue(item) === value)
    : undefined;

  const [isOpen, setIsOpen] = useControllableState({
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: open,
  });

  const [highlightedIndex, setHighlightedIndex, placed, setPlaced] =
    usePortalPatch(
      selectedItem
        ? items.findIndex(
            (item) => itemToValue(selectedItem) === itemToValue(item),
          )
        : -1,
    );

  const downshift = useSelect({
    ...props,
    highlightedIndex,
    isOpen: placed,
    items,
    itemToKey: itemToValue,
    itemToString: itemToLabel,
    onHighlightedIndexChange(changes) {
      if (
        ((changes.type === useSelect.stateChangeTypes.ItemMouseMove ||
          changes.type === useSelect.stateChangeTypes.MenuMouseLeave) &&
          isOpen) ||
        changes.isOpen
      ) {
        setHighlightedIndex(changes.highlightedIndex);
      }
    },
    onIsOpenChange({ isOpen }) {
      setIsOpen(isOpen);
    },
    onSelectedItemChange({ selectedItem }) {
      setValue(itemToValue(selectedItem));
    },
    selectedItem: selectedItem ?? null,
  });

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getMenuProps({}, { suppressRefError: true });

  return (
    <Popper>
      <SelectProvider
        disabled={disabled}
        downshift={downshift}
        highlightedItem={items[highlightedIndex]}
        isOpen={isOpen}
        items={items}
        itemToLabel={itemToLabel}
        placed={placed}
        selectedItem={selectedItem}
        setPlaced={setPlaced}
      >
        {children}
      </SelectProvider>
    </Popper>
  );
}

Select.displayName = "@optiaxiom/react/Select";
