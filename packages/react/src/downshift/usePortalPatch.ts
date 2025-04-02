"use client";

import { useEffect, useState } from "react";

export function usePortalPatch(
  initialHighlightedIndex: (() => number) | number = -1,
) {
  /**
   * In cases where the menu is rendered inside a portal we need to first insert
   * the menu into the DOM, position it relative to the trigger, and then tell
   * downshift that the menu is "open".
   *
   * Otherwise we get scroll jumps where downshift tries to focus input or menu
   * item that has not been placed yet as the default position is (0px, 0px).
   */
  const [placed, setPlaced] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(
    initialHighlightedIndex,
  );
  useEffect(() => {
    if (!placed) {
      setHighlightedIndex(initialHighlightedIndex);
    }
  }, [initialHighlightedIndex, placed]);

  return [
    /**
     * Downshift attempts to scroll to the currently selected item when the menu
     * opens. But since we don't render the menu until it is open the `ref` will
     * not be available yet.
     *
     * So we only return the index when it has been placed and return -1
     * otherwise.
     */
    placed ? highlightedIndex : -1,
    setHighlightedIndex,
    placed,
    setPlaced,
  ] as const;
}
