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

import { useHighlightedIndex } from "../downshift";
import { useObserveValue } from "../hooks";
import { type SelectOption, SelectProvider } from "./SelectContext";
import { SelectHiddenSelect } from "./SelectHiddenSelect";
import { useObserveReset } from "./useObserveReset";

export type SelectProps = {
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
  /**
   * The name of the inner select element.
   */
  name?: string;
  /**
   * Handler for `blur` event forwarded to inner select element.
   */
  onBlur?: FocusEventHandler<HTMLElement>;
  /**
   * Handler for `change` event forwarded to inner select element.
   */
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
  /**
   * Whether the select value is required.
   */
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
      caller: "@optiaxiom/react/Select",
      defaultProp: defaultValue ?? "",
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
      caller: "@optiaxiom/react/Select",
      defaultProp: defaultOpen,
      onChange: onOpenChange,
      prop: open,
    });

    const [highlightedIndex, setHighlightedIndex] = useHighlightedIndex(
      isOpen,
      () =>
        selectedItem
          ? items.findIndex(
              (item) =>
                !item.disabledReason && selectedItem.value === item.value,
            )
          : -1,
    );
    const highlightedItemRef = useRef<HTMLElement>(null);

    const downshift = useSelect({
      highlightedIndex:
        highlightedIndex === -1
          ? items.findIndex((item) => !item.disabledReason)
          : highlightedIndex,
      isItemDisabled: (item) => !!item.disabledReason,
      isOpen,
      // @ts-expect-error -- no harm in supporting read only arrays
      items,
      itemToKey: (item) => (item !== null ? item.value : item),
      itemToString: (item) => (item !== null ? item.label : ""),
      onHighlightedIndexChange(changes) {
        if (changes.type === useSelect.stateChangeTypes.MenuMouseLeave) {
          return;
        }

        if (
          (changes.type === useSelect.stateChangeTypes.ItemMouseMove &&
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
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;

        switch (type) {
          case useSelect.stateChangeTypes.ToggleButtonBlur:
            return {
              ...changes,
              /**
               * Do not select highlighted item when tabbing out of clicking
               * outside to close the menu.
               */
              selectedItem: state.selectedItem,
            };
          default:
            return changes;
        }
      },
    });

    /**
     * Dummy calls to suppress warning from downshift
     */
    downshift.getToggleButtonProps({}, { suppressRefError: true });
    downshift.getMenuProps({}, { suppressRefError: true });

    return (
      <Popper>
        <SelectProvider
          disabled={disabled}
          downshift={downshift}
          highlightedItem={items[downshift.highlightedIndex]}
          highlightedItemRef={highlightedItemRef}
          isOpen={isOpen}
          items={items}
          loading={loading}
          onBlur={onBlur}
          selectedItem={selectedItem}
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
