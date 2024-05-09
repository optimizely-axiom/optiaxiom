import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type ReactNode } from "react";

import { theme } from "../theme";
import { tokens } from "../tokens";

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
        ${selector} {
          ${assignInlineVars(theme, tokens)}
        }
      `}</style>
      {children}
    </>
  );
}

ThemeProvider.displayName = "@optiaxiom/react/ThemeProvider";
