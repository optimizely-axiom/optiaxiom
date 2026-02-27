import type { ProteusEventHandler } from "./schemas";

import { Button } from "../button";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";

export function ProteusAction({
  children,
  onClick,
  ...props
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  onClick?: ProteusEventHandler;
}) {
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
      {...props}
    >
      {children && <ProteusElement element={children} />}
    </Button>
  );
}

ProteusAction.displayName = "@optiaxiom/react/ProteusAction";
