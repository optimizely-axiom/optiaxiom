import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Code } from "../code";
import * as styles from "./Kbd.css";

type KbdProps = BoxProps<
  "kbd",
  styles.KdbVariants & {
    keys?: Array<keyof typeof mapKeyToCode> | keyof typeof mapKeyToCode;
  }
>;

const mapKeyToCode = {
  command: "⌘",
  ctrl: "⌃",
  down: "↓",
  enter: "↵",
  escape: "⎋",
  help: "?",
  left: "←",
  option: "⌥",
  right: "→",
  shift: "⇧",
  space: "␣",
  tab: "⇥",
  up: "↑",
};

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className, keys, variant = "outline", ...props }, ref) => {
    return (
      <Code asChild {...styles.kbd({ variant }, className)} {...props}>
        <kbd ref={ref}>
          {keys &&
            (Array.isArray(keys) ? keys : [keys]).map((key) => (
              <abbr key={key} title={key} {...styles.keys({ variant })}>
                {mapKeyToCode[key]}
              </abbr>
            ))}
          {children}
        </kbd>
      </Code>
    );
  },
);

Kbd.displayName = "@optiaxiom/react/Kbd";
