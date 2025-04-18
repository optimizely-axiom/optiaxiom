import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect } from "downshift";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  forwardRef,
  type ReactNode,
  useMemo,
  useRef,
} from "react";

import { usePortalPatch } from "../downshift";
import { type SelectOption, SelectProvider } from "../select-context";
import { SelectHiddenSelect } from "../select-hidden-select";
import { useObserveValue } from "../use-observe-value";
import { useObserveReset } from "./useObserveReset";

type SelectProps = {
  children?: ReactNode;
  /**
   * The initial open state in uncontrolled mode.
   */
  defaultOpen?: boolean;
  /**
   * The initial selected value in uncontrolled mode.
   */
  defaultValue?: string;
  /**
   * Whether the select is disabled.
   */
  disabled?: boolean;
  /**
   * Whether to show loading spinner inside the menu.
   */
  loading?: boolean;
  name?: string;
  onBlur?: FocusEventHandler<HTMLElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Handler that is called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Handler that is called when the selected value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * The open state in controlled mode.
   */
  open?: boolean;
  /**
   * The select items/options we want to render.
   */
  options: readonly SelectOption[] | SelectOption[];
  required?: boolean;
  /**
   * The selected value in controlled mode.
   */
  value?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      children,
      defaultOpen = false,
      defaultValue,
      disabled,
      loading,
      name,
      onBlur,
      onChange,
      onOpenChange,
      onValueChange,
      open,
      options: items,
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

    const selectedItem = useMemo(
      () =>
        shadowValue !== undefined
          ? items.find((item) => item.value === shadowValue)
          : undefined,
      [items, shadowValue],
    );

    const [isOpen, setIsOpen] = useControllableState({
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: open,
    });

    const [highlightedIndex, setHighlightedIndex, placed, setPlaced] =
      usePortalPatch(() =>
        selectedItem
          ? items.findIndex((item) => selectedItem.value === item.value)
          : -1,
      );

    const downshift = useSelect({
      highlightedIndex,
      isItemDisabled: (item) => !!item.disabledReason,
      isOpen: placed,
      // @ts-expect-error -- no harm in supporting read only arrays
      items,
      itemToKey: (item) => (item !== null ? item.value : item),
      itemToString: (item) => (item !== null ? item.label : ""),
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
        forceValueChange(selectedItem?.value ?? "");
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
          loading={loading}
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
);

Select.displayName = "@optiaxiom/react/Select";
