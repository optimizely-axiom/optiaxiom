import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox } from "downshift";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { useHighlightedIndex } from "../downshift";
import { useEffectEvent } from "../hooks";
import {
  type CommandOption,
  CommandProvider,
  resolveItemProperty,
} from "./CommandContext";
import { useCommandItems } from "./useCommandItems";

export type CommandProps = {
  children?: ReactNode;
  /**
   * Custom empty state content.
   */
  empty?: ReactNode;
  /**
   * Whether combobox should be active or not.
   */
  enabled?: boolean | number;
  /**
   * The input value in controlled mode.
   */
  inputValue?: string;
  /**
   * Whether to show loading spinner or placeholder items inside the menu.
   */
  loading?: "both" | "placeholder" | "spinner" | boolean;
  /**
   * Handler that is called when an item is hovered via mouse.
   */
  onHover?: (item: CommandOption, pointer: boolean) => void;
  /**
   * Handler that is called when input value changes.
   */
  onInputValueChange?: (inputValue: string) => void;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  onSelect?: (
    item: CommandOption,
    context: {
      /**
       * Whether to dismiss the associated popover or keep it open.
       */
      dismiss: boolean;
    },
  ) => void;
  /**
   * The items we want to render.
   */
  options: CommandOption[] | readonly CommandOption[];
};

export function Command({
  children,
  empty,
  enabled,
  inputValue: inputValueProp,
  loading,
  onHover,
  onInputValueChange,
  onSelect: onItemSelect,
  options,
}: CommandProps) {
  const [inputValue, setInputValue] = useControllableState({
    caller: "@optiaxiom/react/Command",
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });
  const items = useCommandItems({ inputValue, options });

  const [highlightedIndex, setHighlightedIndex] = useHighlightedIndex(enabled);

  const pauseInteractionRef = useRef({
    isInsideTriangle: null,
    timer: undefined,
  });

  const highlightedItemRef = useRef<HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<null | {
    context: { dismiss: boolean };
    item: CommandOption;
  }>(null);
  const onItemSelectStable = useEffectEvent(onItemSelect ?? (() => {}));
  useEffect(() => {
    if (selectedItem === null) {
      return;
    }

    onItemSelectStable(selectedItem.item, selectedItem.context);
    setSelectedItem(null);
  }, [onItemSelectStable, selectedItem]);

  const downshift = useCombobox({
    highlightedIndex:
      highlightedIndex === -1
        ? items.findIndex((item) => !resolveItemProperty(item.disabledReason))
        : highlightedIndex,
    inputValue,
    isItemDisabled: (item) =>
      Boolean(resolveItemProperty(item?.disabledReason)),
    isOpen: !!enabled,
    items,
    itemToString: (item) =>
      item !== null ? resolveItemProperty(item.label, { inputValue }) : "",
    onHighlightedIndexChange({ highlightedIndex, type }) {
      setHighlightedIndex(highlightedIndex);

      if (highlightedIndex !== -1) {
        onHover?.(
          items[highlightedIndex],
          type === useCombobox.stateChangeTypes.FunctionSetHighlightedIndex ||
            type === useCombobox.stateChangeTypes.ItemMouseMove,
        );
      }
    },
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;

      /**
       * Manually handle selection since we trigger our own handlers for
       * selection and do not rely on downshift.
       *
       * Otherwise downshift keeps a ref of selectedItem and tries to set the
       * inputValue based on that. But this causes double selection of items
       * since we always keep selectedItem as null.
       */
      if (changes.selectedItem) {
        setSelectedItem({
          context: {
            dismiss:
              type !== useCombobox.stateChangeTypes.FunctionSelectItem ||
              !("selected" in changes.selectedItem),
          },
          item: changes.selectedItem,
        });
        changes.selectedItem = null;
      }

      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
        case useCombobox.stateChangeTypes.InputClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.InputKeyDownEscape:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.MenuMouseLeave:
          return {
            ...changes,
            /**
             * Keep the selected option highlighted rather than resetting to -1
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
      enabled={Boolean(enabled)}
      highlightedItem={items[downshift.highlightedIndex]}
      highlightedItemRef={highlightedItemRef}
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
