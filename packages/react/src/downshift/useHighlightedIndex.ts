"use client";

import { useEffect, useState } from "react";

import { useEvent } from "../hooks";

export function useHighlightedIndex(
  open: boolean | number | undefined,
  getInitialHighlightedIndex: () => number = () => -1,
) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  /**
   * Since we manually track highlightedIndex we need to reset it whenever
   * the menu is closed or the open state changes.
   */
  const getInitialHighlightedIndexStable = useEvent(getInitialHighlightedIndex);
  useEffect(() => {
    if (!open) {
      setHighlightedIndex(-1);
    } else if (open) {
      setHighlightedIndex(getInitialHighlightedIndexStable);
    }
  }, [open, getInitialHighlightedIndexStable]);

  return [
    /**
     * Downshift resets highlightedIndex to -1 when isOpen is set to false so
     * we fallback to the initial value when that is the case.
     */
    highlightedIndex === -1 ? getInitialHighlightedIndex() : highlightedIndex,
    setHighlightedIndex,
  ] as const;
}
