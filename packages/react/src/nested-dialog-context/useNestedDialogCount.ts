"use client";

import { useEffect, useState } from "react";

import { useNestedDialogContext } from "./NestedDialogContext";

export function useNestedDialogCount(name: string, open: boolean | undefined) {
  const { onCountChange } = useNestedDialogContext(name) ?? {};
  const [nestedDialogCount, setNestedDialogCount] = useState(0);

  /**
   * Propagate nested dialog count to parent context whenever open is toggled.
   */
  useEffect(() => {
    if (!onCountChange) {
      return;
    }

    /**
     * Notify parent of 1 (self) + number of own nested dialogs when open.
     */
    if (open) {
      onCountChange(nestedDialogCount + 1);
    }

    /**
     * Clear our nested dialog count from parent context on component unmount
     * or if open prop is toggled.
     */
    return () => onCountChange(0);
  }, [nestedDialogCount, onCountChange, open]);

  return [nestedDialogCount, setNestedDialogCount] as const;
}
