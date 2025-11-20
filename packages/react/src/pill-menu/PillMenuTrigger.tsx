import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixRovingFocus from "@radix-ui/react-roving-focus";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { useCommandContext } from "../command/internals";
import { IconPlus } from "../icons/IconPlus";
import { MenuTrigger } from "../menu";
import { usePillMenuContext } from "./PillMenuContext";

export type PillMenuTriggerProps = ComponentPropsWithoutRef<typeof MenuTrigger>;

export const PillMenuTrigger = forwardRef<
  HTMLButtonElement,
  PillMenuTriggerProps
>(({ children, onKeyDown, ...props }, outerRef) => {
  const { options } = usePillMenuContext("@optiaxiom/react/PillMenuTrigger");
  const { inputValue } = useCommandContext("@optiaxiom/react/PillMenuTrigger");

  const innerRef = useRef<HTMLButtonElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);

  return (
    <RadixRovingFocus.Item asChild key="trigger">
      <MenuTrigger
        appearance={options.length ? "subtle" : "default"}
        aria-label={
          props["aria-label"] ??
          (typeof children === "string" ? children : undefined)
        }
        icon={<IconPlus />}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (event.key === "Backspace") {
            if (options.length) {
              const last = options.length - 1;

              if (!options[last].disabledReason) {
                options[last].execute?.({ dismiss: false, inputValue });
              }
            }
          }
        }}
        ref={ref}
        rounded={options.length ? "full" : undefined}
        size="sm"
        {...props}
      >
        {options.length ? undefined : children}
      </MenuTrigger>
    </RadixRovingFocus.Item>
  );
});

PillMenuTrigger.displayName = "@optiaxiom/react/PillMenuTrigger";
