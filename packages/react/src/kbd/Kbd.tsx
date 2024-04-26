import { type ComponentPropsWithRef, forwardRef } from "react";

import { Code } from "../code";

type KbdProps = ComponentPropsWithRef<typeof Code>;

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, ...props }, ref) => {
    return (
      <Code
        asChild
        borderBottomWidth="2"
        borderWidth="1"
        fontWeight="600"
        whiteSpace="nowrap"
        {...props}
      >
        <kbd ref={ref}>{children}</kbd>
      </Code>
    );
  },
);

Kbd.displayName = "@optiaxiom/react/Kbd";
