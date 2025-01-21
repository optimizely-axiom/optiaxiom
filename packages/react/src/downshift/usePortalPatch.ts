"use client";

import { useEffect, useState } from "react";

import { useDelayedState } from "./useDelayedState";
import { useForceRerender } from "./useForceRerender";

export function usePortalPatch(open: boolean | undefined) {
  /**
   * In cases where the menu is rendered inside a portal we need to place the
   * menu first before we can tell downshift to "open" the menu. First we need
   * to insert the menu in the DOM and then also position it relative to the
   * trigger. Otherwise we get scroll jumps where downshift tries to focus input
   * or menu item that has not been placed yet and so page scroll jumps to top
   * (since the default position is 0, 0).
   */
  const [placed, setPlaced] = useState(false);
  useEffect(() => {
    return () => setPlaced(false);
  }, [open]);

  /**
   * Downshift attempts to scroll to the currently selected item when the menu
   * opens. But since we don't render the menu until it is open the `ref` will
   * not be available yet.
   *
   * So we hold the active highlightedIndex in a ref/queue on first open and
   * wait for next effect/tick to set the highlightedIndex state.
   */
  const [highlightedIndex, setHighlightedIndex] = useDelayedState(-1, placed);

  /**
   * Downshift stores a ref to the menu to check if interactions are happening
   * within the menu. But since we don't render the menu until it is open the
   * `ref` will not be available yet.
   *
   * So we re-render the component once it opens to force update the menu ref.
   */
  useForceRerender(placed);

  return [highlightedIndex, setHighlightedIndex, placed, setPlaced] as const;
}
