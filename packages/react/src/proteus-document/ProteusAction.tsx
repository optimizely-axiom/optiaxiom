import { useState } from "react";

import type { ProteusEventHandler } from "./schemas";

import { Button } from "../button";
import { useProteusDocumentContext } from "./ProteusDocumentContext";
import { ProteusElement } from "./ProteusElement";
import { useResolvedProteusProps } from "./useResolvedProteusProps";

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
  const resolvedOnClick = useResolvedProteusProps(
    onClick ?? {},
  ) as ProteusEventHandler;

  const [loading, setLoading] = useState(false);

  return (
    <Button
      justifyContent="center"
      loading={loading}
      onClick={async () => {
        if (!onClick || loading) {
          return;
        }

        setLoading(true);
        await onEvent(resolvedOnClick);
        setLoading(false);
      }}
      {...useResolvedProteusProps(props)}
    >
      {children && <ProteusElement element={children} />}
    </Button>
  );
}

ProteusAction.displayName = "@optiaxiom/react/ProteusAction";
