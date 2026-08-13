import type { CardLinkProps } from "@optiaxiom/react";

import { CardLink } from "@optiaxiom/react";
import { useState } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useResolveProteusValues } from "../proteus-document/useResolveProteusValues";

export type ProteusCardLinkProps = Omit<CardLinkProps, "onClick"> & {
  /**
   * Action triggered when link is clicked
   */
  onClick?: ProteusEventHandler;
};

export function ProteusCardLink({
  children,
  href,
  onClick,
  ...props
}: ProteusCardLinkProps) {
  const { onEvent } = useProteusDocumentContext(
    "@optiaxiom/proteus/ProteusCardLink",
  );
  const resolvedOnClick = useResolveProteusValues(
    (onClick ?? {}) as Record<string, unknown>,
  ) as ProteusEventHandler;

  const [loading, setLoading] = useState(false);

  // Route bare `href` through the shell's `openLink` event so sandboxed hosts (MCP Apps, OpenAI Apps SDK) — where the browser's `target="_blank"` fallback is blocked — can handle it via `onOpenLink`.
  const hasHrefFallback = !onClick && typeof href === "string" && href !== "";
  const eventToDispatch: ProteusEventHandler | undefined = onClick
    ? resolvedOnClick
    : hasHrefFallback
      ? { action: "openLink", url: href }
      : undefined;

  return (
    <CardLink
      aria-busy={loading || undefined}
      href={href}
      onClick={
        eventToDispatch
          ? async (event) => {
              event.preventDefault();
              if (loading) {
                return;
              }
              setLoading(true);
              await onEvent(eventToDispatch);
              setLoading(false);
            }
          : undefined
      }
      target="_blank"
      {...props}
    >
      {children}
    </CardLink>
  );
}

ProteusCardLink.displayName = "@optiaxiom/proteus/ProteusCardLink";
