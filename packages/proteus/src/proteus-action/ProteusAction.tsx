import type { ButtonProps } from "@optiaxiom/react";

import { Button } from "@optiaxiom/react";
import { useState } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useProteusDocumentPathContext } from "../proteus-document/ProteusDocumentPathContext";
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
  type = "button",
  ...props
}: ProteusActionProps) {
  const { onEvent, valid } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusAction",
  );
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusAction",
  );
  const resolvedOnClick = useResolveProteusValues(
    (onClick ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;

  const [loading, setLoading] = useState(false);

  return (
    <Button
      disabled={type === "submit" && !valid}
      justifyContent="center"
      loading={loading}
      onClick={async () => {
        if (!onClick || loading) {
          return;
        }

        setLoading(true);
        await onEvent(resolveEventPath(resolvedOnClick, parentPath));
        setLoading(false);
      }}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
}

/**
 * Runtime data ops (`pushValue` / `removeValue`) carry a `path` that is
 * relative to the firing component's position in the document. Resolve it to
 * an absolute JSON pointer here — where the positional `Map` context is
 * available — so the document-root event handler can apply it unambiguously.
 */
function resolveEventPath(
  event: ProteusEventHandler,
  parentPath: string,
): ProteusEventHandler {
  if (
    event &&
    typeof event === "object" &&
    "action" in event &&
    (event.action === "pushValue" || event.action === "removeValue")
  ) {
    const { path } = event;
    const resolved =
      path === ""
        ? parentPath
        : path.startsWith("/")
          ? path
          : `${parentPath}/${path}`;
    return { ...event, path: resolved };
  }
  return event;
}

ProteusAction.displayName = "@optiaxiom/proteus/ProteusAction";
