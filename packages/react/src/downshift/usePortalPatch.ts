"use client";

import { useEffect, useState } from "react";

import { useEffectEvent } from "../hooks";

export function usePortalPatch(
  open: boolean | undefined,
  getInitialHighlightedIndex: () => number,
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
  useEffect(() => {
    if (open) {
      /**
       * We wait for first paint to render the menu and then another paint for
       * radix popper to place the menu and set the max-height. Otherwise we
       * cannot scroll to the item because it isn't scrollable yet.
       */
      requestAnimationFrame(() => requestAnimationFrame(() => setPlaced(true)));
    } else {
      setPlaced(false);
    }
  }, [open, setPlaced]);

  const [highlightedIndex, setHighlightedIndex] = useState(
    getInitialHighlightedIndex,
  );
  const getInitialHighlightedIndexStable = useEffectEvent(
    getInitialHighlightedIndex,
  );
  useEffect(() => {
    if (!placed) {
      setHighlightedIndex(getInitialHighlightedIndexStable);
    }
  }, [getInitialHighlightedIndexStable, placed]);

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
  ] as const;
}
