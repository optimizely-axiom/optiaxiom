import { useEffect, useRef } from "react";

import { evaluateCondition, resolveProteusValue } from "./resolveProteusValue";

type AutoSidebarHandler = {
  auto?: unknown;
  params?: unknown;
  resource: string;
  title?: unknown;
};

type AutoSidebarPayload = {
  /** Always true here — lets the host apply auto-specific policy. */
  auto: true;
  params?: Record<string, unknown>;
  resource: string;
  title?: string;
};

/**
 * A `requestSidebar` handler may carry `auto: { when }`, declaring that the
 * host MAY fire it without a click.
 *
 * The host cannot evaluate this itself — `when` and `params` contain
 * ProteusExpressions and the expression engine lives here — so the renderer
 * resolves them and hands the host a plain payload. Honouring it remains
 * entirely the host's decision.
 *
 * Because `auto` lives on the handler rather than on the document, a card that
 * auto-opens always has a visible control to reopen the panel after the user
 * closes it. The trade-off is that the handler can be anywhere in the tree, so
 * we walk it; if several match, **first in document order wins** and the rest
 * keep working as ordinary click handlers.
 *
 * Edge-triggered on `when` going false → true, not fire-once-on-mount:
 * fire-once cannot express "open the panel when the job finishes", which is
 * the main use case. Matches `watch()` semantics.
 */
export function useAutoSidebar(
  document: null | Record<string, unknown>,
  data: Record<string, unknown> | undefined,
  onAuto: ((payload: AutoSidebarPayload) => Promise<void> | void) | undefined,
) {
  const wasSatisfied = useRef(false);

  const handler = document ? findAutoSidebarHandler(document) : null;
  const resolvedData = data ?? {};

  let satisfied = false;
  if (handler && onAuto) {
    const when = (handler.auto as undefined | { when?: unknown })?.when;
    if (when === undefined) {
      satisfied = true;
    } else {
      const conditions = Array.isArray(when) ? when : [when];
      satisfied = conditions.every((condition) =>
        evaluateCondition(condition, resolvedData, "", []),
      );
    }
  }

  useEffect(() => {
    if (!handler || !onAuto) {
      return;
    }
    if (!satisfied) {
      // Reset so a later false → true transition fires again.
      wasSatisfied.current = false;
      return;
    }
    if (wasSatisfied.current) {
      return;
    }
    wasSatisfied.current = true;

    const params = resolveProteusValue(handler.params, resolvedData, "", []) as
      | Record<string, unknown>
      | undefined;
    const title = resolveProteusValue(handler.title, resolvedData, "", []) as
      | string
      | undefined;

    void onAuto({ auto: true, params, resource: handler.resource, title });
    // `resolvedData` is a fresh object each render; `satisfied` already
    // captures the only thing about it that matters here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [satisfied, handler?.resource, onAuto]);
}

/** Depth-first walk; first `requestSidebar` handler carrying `auto` wins. */
function findAutoSidebarHandler(node: unknown): AutoSidebarHandler | null {
  if (!node || typeof node !== "object") {
    return null;
  }

  if (Array.isArray(node)) {
    for (const child of node) {
      const found = findAutoSidebarHandler(child);
      if (found) {
        return found;
      }
    }
    return null;
  }

  const record = node as Record<string, unknown>;
  if (
    record.action === "requestSidebar" &&
    record.auto &&
    typeof record.resource === "string"
  ) {
    return record as AutoSidebarHandler;
  }

  for (const value of Object.values(record)) {
    const found = findAutoSidebarHandler(value);
    if (found) {
      return found;
    }
  }
  return null;
}
