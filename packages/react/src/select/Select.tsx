import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect } from "downshift";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  useRef,
} from "react";

import { usePortalPatch } from "../downshift";
import { SelectProvider } from "../select-context";
import { SelectHiddenSelect } from "../select-hidden-select";
import { useObserveReset } from "./useObserveReset";
import { useObserveValue } from "./useObserveValue";

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
    }) &
  Pick<ComponentPropsWithoutRef<"main">, "onBlur"> &
  Pick<ComponentPropsWithoutRef<"select">, "name" | "onChange" | "required"> & {
    children?: ReactNode;
    defaultOpen?: boolean;
    disabled?: boolean;
    isItemDisabled?: (item: NoInfer<Item>, index: number) => boolean;
    items: Item[];
    itemToLabel?: (item: NoInfer<Item> | null) => string;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Select = forwardRef<HTMLSelectElement, SelectProps<any>>(
  (
    {
      children,
      defaultOpen = false,
      defaultValue,
      disabled,
      isItemDisabled = () => false,
      items,
      itemToLabel = (value) => (value ? String(value) : ""),
      itemToValue = (item: unknown) =>
        typeof item === "string" ? item : undefined,
      name,
      onBlur,
      onChange,
      onOpenChange,
      onValueChange,
      open,
      required,
      value,
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const [shadowValue, setShadowValue] = useControllableState({
      defaultProp: defaultValue,
      onChange: onValueChange,
      prop: value,
    });
    useObserveValue(innerRef, setShadowValue);
    useObserveReset(innerRef, setShadowValue);

    const selectedItem = shadowValue
      ? items.find((item) => itemToValue(item) === shadowValue)
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
      highlightedIndex,
      isItemDisabled,
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
        if (innerRef.current) {
          innerRef.current.value = itemToValue(selectedItem) ?? "";
        }
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
          itemToValue={itemToValue}
          onBlur={onBlur}
          placed={placed}
          selectedItem={selectedItem}
          setPlaced={setPlaced}
        >
          <SelectHiddenSelect
            defaultValue={defaultValue}
            name={name}
            onChange={(event) => {
              setShadowValue(event.target.value);
              onChange?.(event);
            }}
            ref={ref}
            required={required}
            value={value}
          />
          {children}
        </SelectProvider>
      </Popper>
    );
  },
) as (<Item>(
  props: SelectProps<Item>,
) => null | ReactElement<SelectProps<Item>>) & { displayName: string };

Select.displayName = "@optiaxiom/react/Select";
