import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCombobox } from "downshift";
import { type ReactNode, useEffect, useRef, useState } from "react";

import {
  type CommandOption,
  CommandProvider,
  resolveItemProperty,
} from "../command-context";
import { usePortalPatch } from "../downshift";
import { useCommandItems } from "../use-command-items";
import { useEffectEvent } from "../use-event";

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
   * The items we want to render.
   */
  items: CommandOption[] | readonly CommandOption[];
  /**
   * Whether to show loading spinner inside the menu.
   */
  loading?: boolean;
  /**
   * Handler that is called when input value changes.
   */
  onInputValueChange?: (inputValue: string) => void;
  /**
   * Handler that is called when an item is selected either via keyboard or mouse.
   */
  onItemSelect?: () => void;
};

export function Command({
  children,
  empty,
  inputValue: inputValueProp,
  items: itemsProp,
  loading,
  onInputValueChange,
  onItemSelect,
}: CommandProps) {
  const [inputValue, setInputValue] = useControllableState({
    defaultProp: "",
    onChange: onInputValueChange,
    prop: inputValueProp,
  });
  const items = useCommandItems({ inputValue, items: itemsProp });

  const [activePath, setActivePath] = useState<number[]>([]);
  useEffect(() => {
    if (inputValue) {
      setActivePath((path) => (path.length ? [] : path));
    }
  }, [inputValue]);

  const [highlightedIndex, setHighlightedIndex, placed, setPlaced] =
    usePortalPatch(() =>
      items.findIndex((item) => resolveItemProperty(item.selected)),
    );

  const pauseInteractionRef = useRef({
    timer: undefined,
    triangle: null,
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
        if (items[highlightedIndex]?.subItems?.length) {
          setActivePath((path) =>
            !path.includes(highlightedIndex) ? [highlightedIndex] : path,
          );
        } else {
          setActivePath((path) => (path.length ? [] : path));
        }
      }
    },
    onSelectedItemChange({ highlightedIndex, selectedItem, type }) {
      if (
        type !== useCombobox.stateChangeTypes.InputBlur &&
        selectedItem !== null
      ) {
        if (
          typeof highlightedIndex === "number" &&
          selectedItem.subItems?.length
        ) {
          setActivePath((path) =>
            !path.includes(highlightedIndex) ? [highlightedIndex] : path,
          );
        } else {
          selectedItem.execute?.({ inputValue });
          onItemSelect?.();
        }
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
      activePath={activePath}
      downshift={downshift}
      empty={empty}
      highlightedItem={items[downshift.highlightedIndex]}
      inputValue={inputValue}
      items={items}
      loading={loading}
      pauseInteractionRef={pauseInteractionRef}
      placed={placed}
      setActivePath={setActivePath}
      setHighlightedIndex={setHighlightedIndex}
      setInputValue={useEffectEvent((newInputValue: string) => {
        if (inputValue === "" && newInputValue === "") {
          onInputValueChange?.("");
        } else {
          setInputValue(newInputValue);
        }
      })}
      setPlaced={setPlaced}
    >
      {children}
    </CommandProvider>
  );
}

Command.displayName = "@optiaxiom/react/Command";
