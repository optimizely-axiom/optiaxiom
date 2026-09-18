import type { ButtonProps } from "@optiaxiom/react";

import { Button } from "@optiaxiom/react";
import { useId } from "react";

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
  const { onEvent, pendingAction, setPendingAction, valid } =
    useProteusDocumentContext("@optiaxiom/proteus/ProteusAction");
  const { path: parentPath } = useProteusDocumentPathContext(
    "@optiaxiom/proteus/ProteusAction",
  );
  const resolvedOnClick = useResolveProteusValues(
    (onClick ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;

  const id = useId();
  const loading = pendingAction === id;

  return (
    <Button
      disabled={(type === "submit" && !valid) || (!!pendingAction && !loading)}
      justifyContent="center"
      loading={loading}
      onClick={async () => {
        if (!onClick || pendingAction) {
          return;
        }

        setPendingAction(id);
        try {
          await onEvent(resolveEventPath(resolvedOnClick, parentPath));
        } finally {
          setPendingAction(undefined);
        }
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
    (event.action === "pushValue" ||
      event.action === "removeValue" ||
      event.action === "setValue")
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
