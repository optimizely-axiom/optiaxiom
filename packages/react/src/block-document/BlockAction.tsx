import type { BlockActionProps } from "./schemas";

import { Button } from "../button";
import { useBlockDocumentContext } from "./BlockDocumentContext";
import { BlockElement } from "./BlockElement";

export function BlockAction({ children, onClick, ...props }: BlockActionProps) {
  const { onEvent } = useBlockDocumentContext("@optiaxiom/react/BlockAction");

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
      {children && <BlockElement element={children} />}
    </Button>
  );
}

BlockAction.displayName = "@optiaxiom/react/BlockAction";
