import { theme, tokens } from "@optiaxiom/globals";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ReactNode, useEffect, useRef, useState } from "react";

import { layers } from "../layers";
import { PortalProvider } from "../portal/internals";
import { mapValues, rem } from "../utils";

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
 * `screens` stays in plain rem since breakpoints feed media queries.
 */
const scaledTokens = {
  ...tokens,
  borderRadius: mapValues(tokens.borderRadius, rem),
  fontSize: mapValues(tokens.fontSize, (value) => mapValues(value, rem)),
  maxSize: mapValues(tokens.maxSize, rem),
  size: mapValues(tokens.size, rem),
};

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
    const root = ref.current?.getRootNode();
    if (root instanceof ShadowRoot) {
      setContainer(root);
    }
  }, []);

  return (
    <PortalProvider container={container}>
      <style ref={ref}>{`
        @layer ${layers.theme} {
          ${selector} {
            --ax-styles-scale: 1rem;
            ${assignInlineVars(theme, {
              ...scaledTokens,
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
