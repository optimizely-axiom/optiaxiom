import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Kbd.css";

export type KbdProps = BoxProps<
  "kbd",
  styles.KeyVariants & {
    /**
     * Keyboard symbols/shortcuts to include.
     */
    modifiers?:
      | Array<keyof (typeof mapModifierToCode)["mac"]>
      | keyof (typeof mapModifierToCode)["mac"];
  }
>;
const platform =
  typeof navigator !== "undefined" &&
  (navigator.platform.startsWith("Mac") || navigator.platform === "iPhone")
    ? "mac"
    : "win";
const mapModifierToCode = {
  mac: {
    alt: "⌥",
    ctrl: "⌃",
    meta: "⌘",
    shift: "⇧",
  },
  win: {
    alt: "Alt",
    ctrl: "Ctrl",
    meta: "Win",
    shift: "Shift",
  },
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className, modifiers, variant = "outline", ...props }, ref) => {
    return (
      <Box asChild {...styles.kbd({}, className)} {...props}>
        <kbd ref={ref}>
          {modifiers &&
            (Array.isArray(modifiers) ? modifiers : [modifiers]).map(
              (key) =>
                key in mapModifierToCode[platform] && (
                  <Box
                    aria-label={key}
                    asChild
                    key={key}
                    title={key}
                    {...styles.key({ variant })}
                  >
                    <kbd>{mapModifierToCode[platform][key]}</kbd>
                  </Box>
                ),
            )}
          <Box asChild {...styles.key({ variant })}>
            <kbd>{children}</kbd>
          </Box>
        </kbd>
      </Box>
    );
  },
);

Kbd.displayName = "@optiaxiom/react/Kbd";
