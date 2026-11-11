import { useId } from "@radix-ui/react-id";
import { Popper } from "@radix-ui/react-popper";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useSelect } from "downshift";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  forwardRef,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Avatar } from "../avatar";
import { useHighlightedIndex } from "../downshift";
import { useObserveValue } from "../hooks";
import { useMessages } from "../locale";
import { useSurface } from "../surface";
import { useSuggestions } from "../surface/internals";
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
   * Native `change` event handler for the hidden select element. Prefer `onValueChange` for most use cases.
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  /**
   * Handler that is called when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Handler that is called when the selected value changes. Use this to track the selected value.
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

/**
 * Single-select form input for choosing one value from a dropdown list.
 * Works like a native `<select>` — supports `name`, `value`, `onChange`,
 * and works with `<form>` submissions.
 *
 * Must be used with SelectTrigger and SelectContent sub-components.
 *
 * Use Select when: single value selection in a form, controlled/uncontrolled
 * form input, you need form submission support.
 *
 * Use Menu instead when: you need multi-select, actions (edit/delete),
 * links, filtering/search, nested sub-menus, or checkbox/radio items.
 *
 * @group Select
 * @category form
 * @since 1.4.0
 */
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
      options,
      required,
      value,
    },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null);
    const messages = useMessages();

    const surface = useSurface("property");
    const suggestions = useSuggestions("property", "value");
    const suggestion = suggestions?.[0];

    const [shadowValue, setShadowValue] = useControllableState({
      caller: "@optiaxiom/react/Select",
      defaultProp: defaultValue ?? "",
      onChange: (newValue) => {
        surface?.track({
          name: "changed",
          value: newValue,
        });

        if (suggestion && newValue === suggestion.value) {
          surface?.accept(suggestion.id);
        }

        onValueChange?.(newValue);
      },
      prop: value,
    });
    useObserveReset(innerRef, setShadowValue);
    const [ref, forceValueChange] = useObserveValue(
      innerRef,
      outerRef,
      setShadowValue,
    );

    const items = useMemo(() => {
      return options
        .map((option) =>
          option.value === suggestion?.value
            ? {
                ...option,
                detail: <Avatar fallback="opal" size="2xs" />,
                group: {
                  hidden: true,
                  label: messages["Suggested"],
                  priority: 1000,
                },
              }
            : option,
        )
        .sort((a, b) => {
          return (b.group?.priority ?? 0) - (a.group?.priority ?? 0);
        });
    }, [messages, options, suggestion]);

    const warnedLabelsRef = useRef(new Set<string>());
    useEffect(() => {
      if (process.env.NODE_ENV === "production") {
        return;
      }

      for (const option of options) {
        if (
          "disabled" in option &&
          option.disabled &&
          !option.disabledReason &&
          !warnedLabelsRef.current.has(option.label)
        ) {
          warnedLabelsRef.current.add(option.label);
          console.error(
            `Option "${option.label}" sets \`disabled\`, which has no effect. Did you mean \`disabledReason\`?`,
          );
        }
      }
    }, [options]);

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

    const [focusVisible, setFocusVisible] = useState(false);
    useEffect(() => {
      if (!isOpen) {
        setFocusVisible(false);
      }
    }, [isOpen]);

    const toggleButtonId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const downshift = useSelect({
      highlightedIndex:
        highlightedIndex === -1
          ? items.findIndex((item) => !item.disabledReason)
          : highlightedIndex,
      isOpen,
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

        if (
          !(
            changes.type === useSelect.stateChangeTypes.ItemMouseMove ||
            changes.type === useSelect.stateChangeTypes.ToggleButtonClick
          )
        ) {
          setFocusVisible(true);
        }
      },
      onIsOpenChange({ isOpen, type }) {
        setIsOpen(isOpen);
        if (
          isOpen &&
          (type === useSelect.stateChangeTypes.ToggleButtonKeyDownArrowDown ||
            type === useSelect.stateChangeTypes.ToggleButtonKeyDownArrowUp)
        ) {
          setFocusVisible(true);
        }
      },
      onSelectedItemChange({ selectedItem }) {
        forceValueChange(selectedItem?.value ?? "");
      },
      selectedItem: selectedItem ?? null,
      stateReducer: (state, actionAndChanges) => {
        const { changes, type } = actionAndChanges;

        /**
         * Items with a disabled reason stay reachable by keyboard so their
         * reason can be read, but no action may select them.
         */
        if (
          type !== useSelect.stateChangeTypes.ToggleButtonBlur &&
          changes.selectedItem !== state.selectedItem &&
          changes.selectedItem?.disabledReason
        ) {
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: state.isOpen,
            selectedItem: state.selectedItem,
          };
        }

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
      toggleButtonId,
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
          focusVisible={focusVisible}
          highlightedItem={items[downshift.highlightedIndex]}
          highlightedItemRef={highlightedItemRef}
          isOpen={isOpen}
          items={items}
          loading={loading}
          onBlur={onBlur}
          selectedItem={selectedItem}
          setFocusVisible={setFocusVisible}
          toggleButtonId={toggleButtonId}
          triggerRef={triggerRef}
        >
          <SelectHiddenSelect
            defaultValue={defaultValue}
            disabled={disabled}
            name={name}
            onChange={(event) => {
              /**
               * Explicit wrapper needed to satisfy React's controlled component
               * requirement. When `value` prop is provided, React expects an
               * onChange handler to avoid "controlled without onChange"
               * warnings. Actual value changes are driven by Downshift and the
               * shadow value system (onValueChange), not by this onChange
               * handler.
               */
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
