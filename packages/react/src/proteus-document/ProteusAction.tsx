import type { ProteusActionProps } from "./schemas";

import { Button } from "../button";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";

export function ProteusAction({
  children,
  onClick,
  ...props
}: ProteusActionProps) {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/react/ProteusAction",
  );

  return (
    <Button
      justifyContent="center"
      onClick={() => {
        if (!onClick) {
          return;
        }

        onEvent(onClick);
      }}
      size="lg"
      {...props}
    >
      {children && <ProteusElement element={children} />}
    </Button>
  );
}

ProteusAction.displayName = "@optiaxiom/react/ProteusAction";
