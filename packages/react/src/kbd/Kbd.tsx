import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./Kbd.css";

export type KbdProps = BoxProps<
  "kbd",
  {
    /**
     * Modifier keys to show before the children, as symbols on macOS and
     * names elsewhere. `mod` is Command (⌘) on macOS and Ctrl on other
     * platforms: use it for shortcuts like Cmd/Ctrl+K.
     */
    modifiers?:
      | Array<keyof (typeof mapModifierToCode)["mac"]>
      | keyof (typeof mapModifierToCode)["mac"];
  } & styles.KeyVariants
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
    mod: "⌘",
    shift: "⇧",
  },
  win: {
    alt: "Alt",
    ctrl: "Ctrl",
    meta: "Win",
    mod: "Ctrl",
    shift: "Shift",
  },
};

/**
 * Inline text representing keyboard input.
 *
 * @category data-display
 * @since 0.1.0
 * @extends Code
 */
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
