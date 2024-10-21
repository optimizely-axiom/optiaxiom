import type { UseComboboxProps, UseSelectProps } from "downshift";

import { useDelayedState } from "./useDelayedState";

export function usePortalPatch<T>(
  props: UseComboboxProps<T> | UseSelectProps<T>,
): Omit<UseComboboxProps<T> & UseSelectProps<T>, "items"> {
  /**
   * Downshift attempts to scroll to the currently selected item when the menu
   * opens. But since we don't render the menu until it is open the `ref` will
   * not be available yet.
   *
   * So we hold the active highlightedIndex in a ref/queue on first open and
   * wait for next effect/tick to set the highlightedIndex state.
   */
  const [highlightedIndex, setHighlightedIndex] = useDelayedState(
    -1,
    props.isOpen,
  );

  return {
    highlightedIndex,
    onHighlightedIndexChange({ highlightedIndex }) {
      setHighlightedIndex(highlightedIndex);
    },
  };
}
