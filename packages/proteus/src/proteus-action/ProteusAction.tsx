import type { ButtonProps } from "@optiaxiom/react";

import { Button } from "@optiaxiom/react";
import { useState } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useResolveProteusValues } from "../proteus-document/useResolveProteusValues";

export type ProteusActionProps = Omit<ButtonProps, "onClick"> & {
  /**
   * Action triggered when button is clicked
   */
  onClick?: ProteusEventHandler;
};

export function ProteusAction({
  children,
  onClick,
  ...props
}: ProteusActionProps) {
  const { onEvent, valid } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusAction",
  );
  const resolvedOnClick = useResolveProteusValues(
    (onClick ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;

  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={!valid}
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
      {...props}
    >
      {children}
    </Button>
  );
}

ProteusAction.displayName = "@optiaxiom/proteus/ProteusAction";
