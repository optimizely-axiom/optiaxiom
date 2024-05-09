import { theme, tokens } from "@optiaxiom/globals";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ReactNode } from "react";

type ThemeProviderProps = {
  children?: ReactNode;
  selector?: string;
};

export function ThemeProvider({
  children,
  selector = ":root",
}: ThemeProviderProps) {
  return (
    <>
      <style>{`
        @layer optiaxiom.theme {
          ${selector} {
            ${assignInlineVars(theme, tokens)}
          }
        }
      `}</style>
      {children}
    </>
  );
}

ThemeProvider.displayName = "@optiaxiom/react/ThemeProvider";
