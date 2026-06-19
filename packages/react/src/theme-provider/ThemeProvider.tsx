import { theme, tokens } from "@optiaxiom/globals";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { layers } from "../layers";
import { PortalProvider } from "../portal/internals";

export type ThemeProviderProps = {
  children?: ReactNode;
};

/**
 * TODO: remove color fallback once `light-dark()` is widely available.
 */
const lightColors = Object.fromEntries(
  Object.entries(tokens.colors).map(([k, v]) => [
    k,
    v.slice(v.indexOf("(") + 1, v.indexOf(",")),
  ]),
) as typeof tokens.colors;

/**
 * Provider component for theme tokens and styles. This is included in
 * AxiomProvider by default - you only need to use this component directly for
 * advanced customization.
 *
 * @category provider
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [container, setContainer] = useState<ShadowRoot>();
  const selector =
    typeof ShadowRoot !== "undefined" && container instanceof ShadowRoot
      ? ":host"
      : ":root";

  const ref = useRef<HTMLStyleElement>(null);
  useEffect(() => {
    const root = findShadowRoot(ref.current);
    if (root) {
      setContainer(root);
    }
  }, []);

  return (
    <PortalProvider container={container}>
      <style ref={ref}>{`
        @layer ${layers.theme} {
          ${selector} {
            ${assignInlineVars(theme, {
              ...tokens,
              colors: lightColors,
            })}
          }

          @supports (color: light-dark(black, white)) {
            ${selector} {
              ${assignInlineVars(theme.colors, tokens.colors)}
            }
          }
        }
      `}</style>
      {children}
    </PortalProvider>
  );
}

ThemeProvider.displayName = "@optiaxiom/react/ThemeProvider";

/**
 * Resolve the shadow root a node is rendered into.
 *
 * Covers two cases:
 *
 * 1. The subtree physically lives inside a shadow root - `getRootNode()`
 *    returns the `ShadowRoot` directly.
 * 2. The subtree is light DOM but projected into a shadow root via a
 *    `<slot>`. Slotted content's `getRootNode()` returns the document, so we
 *    walk up the light-DOM ancestors looking for one assigned to a slot, then
 *    hop to that slot's root node (the shadow root we are composed into).
 */
function findShadowRoot(node: Node | null): null | ShadowRoot {
  if (typeof ShadowRoot === "undefined") {
    return null;
  }

  const root = node?.getRootNode();
  if (root instanceof ShadowRoot) {
    return root;
  }

  let el = node instanceof Element ? node : (node?.parentElement ?? null);
  while (el) {
    const slotRoot = el.assignedSlot?.getRootNode();
    if (slotRoot instanceof ShadowRoot) {
      return slotRoot;
    }
    el = el.parentElement;
  }

  return null;
}
