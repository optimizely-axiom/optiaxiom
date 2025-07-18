import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { MenuContent } from "../menu";

export type PillMenuContentProps = ComponentPropsWithoutRef<typeof MenuContent>;

export const PillMenuContent = forwardRef<HTMLDivElement, PillMenuContentProps>(
  (props, ref) => {
    const lastFocusRef = useRef<Element>();

    return (
      <MenuContent
        onCloseAutoFocus={(event) => {
          if (
            lastFocusRef.current instanceof HTMLElement &&
            lastFocusRef.current !== document.body &&
            document.body.contains(lastFocusRef.current)
          ) {
            event.preventDefault();
            lastFocusRef.current.focus();
          }

          lastFocusRef.current = undefined;
        }}
        onOpenAutoFocus={() => {
          lastFocusRef.current = document.activeElement ?? undefined;
        }}
        ref={ref}
        {...props}
      />
    );
  },
);

PillMenuContent.displayName = "@optiaxiom/react/PillMenuContent";
