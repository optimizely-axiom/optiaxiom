"use client";

import { useContext } from "react";

import { DialogKitContext } from "./DialogKitContext";

export function useDialogKit() {
  const context = useContext(DialogKitContext);
  if (!context) {
    throw new Error(
      `\`useDialogItemContext\` must be used within managed dialogs.`,
    );
  }
  return {
    /**
     * The ID of the managed dialog item in the current context.
     */
    id: context.id,
  };
}
