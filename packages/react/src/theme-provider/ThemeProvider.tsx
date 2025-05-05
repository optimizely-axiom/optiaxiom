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
