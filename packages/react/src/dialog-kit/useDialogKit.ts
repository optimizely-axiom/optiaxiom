"use client";

import { useContext } from "react";

import { DialogKitContext } from "./DialogKitContext";

/**
 * Hook to access the dialog kit context.
 *
 * @experimental
 */
export function useDialogKit() {
  const context = useContext(DialogKitContext);
  if (!context) {
    throw new Error(
      "`useDialogKit` must be used inside a dialog opened with `dialogkit.create()`.",
    );
  }
  return {
    /**
     * The ID of the managed dialog item in the current context.
     */
    id: context.id,
  };
}
