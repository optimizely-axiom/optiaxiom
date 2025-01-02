import { useEffect, useState } from "react";

import { useNestedDialogContext } from "./NestedDialogContext";

export function useNestedDialogCount(name: string, open: boolean | undefined) {
  const { onCountChange } = useNestedDialogContext(name) ?? {};
  const [nestedDialogCount, setNestedDialogCount] = useState(0);
  useEffect(() => {
    if (!onCountChange) {
      return;
    }

    onCountChange(open ? nestedDialogCount + 1 : 0);
  }, [nestedDialogCount, onCountChange, open]);

  const isRootDialog = !onCountChange;
  return [isRootDialog, nestedDialogCount, setNestedDialogCount] as const;
}
