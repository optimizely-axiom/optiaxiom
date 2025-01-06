import { theme, tokens } from "@optiaxiom/globals";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ReactNode } from "react";

type ThemeProviderProps = {
  children?: ReactNode;
  selector?: string;
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

export function ThemeProvider({
  children,
  selector = ":root",
}: ThemeProviderProps) {
  return (
    <>
      <style>{`
        @layer optiaxiom.theme {
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
    </>
  );
}

ThemeProvider.displayName = "@optiaxiom/react/ThemeProvider";
