import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect } from "downshift";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
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
      /**
       * The initial selected value in uncontrolled mode.
       */
      defaultValue?: string;
      /**
       * Return a unique key for each item.
       */
      itemToValue: (item: NoInfer<Item>) => string | undefined;
      /**
       * Handler that is called when the selected value changes.
       */
      onValueChange?: (value: string) => void;
      /**
       * The selected value in controlled mode.
       */
      value?: string;
    }) & {
  children?: ReactNode;
  /**
   * The initial open state in uncontrolled mode.
   */
  defaultOpen?: boolean;
  /**
   * Whether the select is disabled.
   */
  disabled?: boolean;
  /**
   * Return true if items need to be marked as disabled and skipped from keyboard navigation.
   */
  isItemDisabled?: (item: NoInfer<Item>, index: number) => boolean;
  /**
   * The select items/options we want to render.
   */
  items: Item[] | readonly Item[];
  /**
   * Return a string representation of items if they are objects.
   */
  itemToLabel?: (item: NoInfer<Item>) => string;
  name?: string;
  onBlur?: FocusEventHandler<HTMLElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Handler that is called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * The open state in controlled mode.
   */
  open?: boolean;
  required?: boolean;
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
      // @ts-expect-error -- no harm in supporting read only arrays
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
