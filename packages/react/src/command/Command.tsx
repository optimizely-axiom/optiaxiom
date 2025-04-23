import { useCombobox } from "downshift";
import { useControllableState } from "radix-ui/internal";
import { type ReactNode, useRef } from "react";

import { usePortalPatch } from "../downshift";
import {
  type CommandOption,
  CommandProvider,
  resolveItemProperty,
} from "./CommandContext";
import { useCommandItems } from "./useCommandItems";

type CommandProps = {
  children?: ReactNode;
  /**
   * Custom empty state content.
   */
  empty?: ReactNode;
  /**
   * The input value in controlled mode.
   */
  inputValue?: string;
  /**
   * Whether to show loading spinner inside the menu.
   */
  loading?: boolean;
  /**
   * Handler that is called when an item is hovered via mouse.
   */
  onHover?: (item: CommandOption) => void;
  /**
   * Handler that is called when input value changes.
   */
  onInputValueChange?: (inputValue: string) => void;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  onSelect?: (item: CommandOption, context: { close: boolean }) => void;
  open?: boolean;
  /**
   * The items we want to render.
   */
  options: CommandOption[] | readonly CommandOption[];
};

export function Command({
  children,
  empty,
  inputValue: inputValueProp,
  loading,
  onHover,
  onInputValueChange,
  onSelect: onItemSelect,
  open,
  options,
}: CommandProps) {
  const [inputValue, setInputValue] = useControllableState({
    caller: "@optiaxiom/react/Command",
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });
  const items = useCommandItems({ inputValue, options });

  const [highlightedIndex, setHighlightedIndex, placed] = usePortalPatch(
    open,
    () =>
      items.findIndex(
        (item) =>
          !resolveItemProperty(item.disabledReason) &&
          resolveItemProperty(item.selected) &&
          !item.multi,
      ),
  );

  const pauseInteractionRef = useRef({
    isInsideTriangle: null,
    timer: undefined,
  });

  const downshift = useCombobox({
    highlightedIndex:
      highlightedIndex === -1
        ? items.findIndex((item) => !resolveItemProperty(item.disabledReason))
        : highlightedIndex,
    inputValue,
    isItemDisabled: (item) =>
      Boolean(resolveItemProperty(item?.disabledReason)),
    isOpen: placed,
    items,
    itemToString: (item) =>
      item !== null ? resolveItemProperty(item.label, { inputValue }) : "",
    onHighlightedIndexChange({ highlightedIndex, type }) {
      if (type === useCombobox.stateChangeTypes.MenuMouseLeave) {
        return;
      }

      setHighlightedIndex(highlightedIndex);

      if (
        highlightedIndex !== -1 &&
        type === useCombobox.stateChangeTypes.ItemMouseMove
      ) {
        onHover?.(items[highlightedIndex]);
      }
    },
    onSelectedItemChange({ selectedItem, type }) {
      if (
        type !== useCombobox.stateChangeTypes.InputBlur &&
        selectedItem !== null
      ) {
        onItemSelect?.(selectedItem, {
          close:
            type !== useCombobox.stateChangeTypes.FunctionSelectItem ||
            !("selected" in selectedItem),
        });
      }
    },
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            /**
             * Keep the selected option highlighted rather than resetting to -1
             * TODO: reset if activePath had values
             */
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
  });

  /**
   * Dummy calls to suppress warning from downshift
   */
  downshift.getInputProps({}, { suppressRefError: true });
  downshift.getMenuProps({}, { suppressRefError: true });

  return (
    <CommandProvider
      downshift={downshift}
      empty={empty}
      highlightedItem={items[downshift.highlightedIndex]}
      inputValue={inputValue}
      items={items}
      loading={loading}
      pauseInteractionRef={pauseInteractionRef}
      setHighlightedIndex={setHighlightedIndex}
      setInputValue={setInputValue}
    >
      {children}
    </CommandProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
