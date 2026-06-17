import type { CardLinkProps } from "@optiaxiom/react";

import { CardLink } from "@optiaxiom/react";
import { useState } from "react";

import type { ProteusEventHandler } from "../proteus-document/schemas";

import { useProteusDocumentContext } from "../proteus-document/ProteusDocumentContext";
import { useResolveProteusValues } from "../proteus-document/useResolveProteusValues";
import { cardLinkMarker } from "./ProteusCardLink.css";

export type ProteusCardLinkProps = Omit<CardLinkProps, "onClick"> & {
  /**
   * Action triggered when link is clicked
   */
  onClick?: ProteusEventHandler;
};

export function ProteusCardLink({
  children,
  className,
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

  return (
    <CardLink
      aria-busy={loading || undefined}
      className={[cardLinkMarker, className].filter(Boolean).join(" ")}
      onClick={
        onClick
          ? async (event) => {
              event.preventDefault();
              if (loading) {
                return;
              }
              setLoading(true);
              await onEvent(resolvedOnClick);
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
