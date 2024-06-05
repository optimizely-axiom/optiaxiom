import clsx from "clsx";
import { type ComponentPropsWithRef, forwardRef } from "react";

import { Code } from "../code";
import * as styles from "./Kbd.css";

type KbdProps = {
  keys?: Array<keyof typeof mapKeyToCode> | keyof typeof mapKeyToCode;
} & ComponentPropsWithRef<typeof Code>;

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
  ({ children, className, keys, ...props }, ref) => {
    return (
      <Code
        alignItems="center"
        asChild
        border="1"
        className={clsx(styles.base, className)}
        display="inline-flex"
        flexDirection="row"
        fontWeight="600"
        gap="4"
        whiteSpace="nowrap"
        {...props}
      >
        <kbd ref={ref}>
          {keys &&
            (Array.isArray(keys) ? keys : [keys]).map((key) => (
              <abbr className={styles.keys} key={key} title={key}>
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
