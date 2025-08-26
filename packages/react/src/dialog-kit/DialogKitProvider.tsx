import type { ReactNode } from "react";

import { useSyncExternalStore } from "use-sync-external-store/shim";

import { Dialog } from "../dialog";
import { dialogkit } from "./dialogkit";
import { DialogKitContext } from "./DialogKitContext";

export type DialogKitProviderProps = {
  /**
   * An instance of dialogkit returned from the `createDialogKit` method.
   */
  kit?: typeof dialogkit;
};

export function DialogKitProvider({ kit = dialogkit }: DialogKitProviderProps) {
  const items = useSyncExternalStore(...kit.store);
  return items.reduce<ReactNode>(
    (result, item) => (
      <Dialog key={item.id} open={item.open}>
        <DialogKitContext.Provider
          value={{
            id: item.id,
            onClose: item.onClose,
            onDismiss: (event, reason) => {
              item.onDismiss?.(event, reason);
              if (event.defaultPrevented) {
                return;
              }

              dialogkit.remove(item.id);
            },
          }}
        >
          {item.element}
        </DialogKitContext.Provider>
        {result}
      </Dialog>
    ),
    null,
  );
}

DialogKitProvider.displayName = "@optiaxiom/react/DialogKitProvider";
