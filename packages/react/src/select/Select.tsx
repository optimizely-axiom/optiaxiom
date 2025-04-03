import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect } from "downshift";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  useMemo,
  useRef,
} from "react";

import { usePortalPatch } from "../downshift";
import { SelectProvider } from "../select-context";
import { SelectHiddenSelect } from "../select-hidden-select";
import { useEffectEvent } from "../use-event";
import { useObserveValue } from "../use-observe-value";
import { useObserveReset } from "./useObserveReset";

type SelectProps<Item> = (NoInfer<Item> extends string
  ? {
      defaultValue?: NoInfer<Item>;
      itemToValue?: (item: NoInfer<Item>) => NoInfer<Item> | undefined;
      onValueChange?: (value: NoInfer<Item>) => void;
      value?: NoInfer<Item>;
    }
  : {
      defaultValue?: string;
      itemToValue: (item: NoInfer<Item>) => string | undefined;
      onValueChange?: (value: string) => void;
      value?: string;
    }) &
  Pick<ComponentPropsWithoutRef<"main">, "onBlur"> &
  Pick<ComponentPropsWithoutRef<"select">, "name" | "onChange" | "required"> & {
    children?: ReactNode;
    defaultOpen?: boolean;
    disabled?: boolean;
    isItemDisabled?: (item: NoInfer<Item>, index: number) => boolean;
    items: Item[];
    itemToLabel?: (item: NoInfer<Item>) => string;
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
      itemToValue = (item) => item,
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
    const forceValueChange = useObserveValue(innerRef, setShadowValue);
    useObserveReset(innerRef, setShadowValue);

    const itemToValueStable = useEffectEvent(itemToValue);
    const selectedItem = useMemo(
      () =>
        shadowValue !== undefined
          ? items.find((item) => itemToValueStable(item) === shadowValue)
          : undefined,
      [itemToValueStable, items, shadowValue],
    );

    const [isOpen, setIsOpen] = useControllableState({
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: open,
    });

    const [highlightedIndex, setHighlightedIndex, placed, setPlaced] =
      usePortalPatch(() =>
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
      itemToKey: (item) => (item !== null ? itemToValue(item) : item),
      itemToString: (item) => (item !== null ? itemToLabel(item) : ""),
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
        forceValueChange(itemToValue(selectedItem) ?? "");
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
            disabled={disabled}
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
