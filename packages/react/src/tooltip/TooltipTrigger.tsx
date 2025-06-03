import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { Button } from "../button";
import { FilteredSlot } from "../filtered-slot";
import { useTooltipContext } from "./TooltipContext";

export type TooltipTriggerProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Trigger
>;

export const TooltipTrigger = forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(({ asChild, children, onFocus, onPointerMove, ...props }, outerRef) => {
  const { auto } = useTooltipContext("@optiaxiom/react/TooltipTrigger");
  const innerRef = useRef<HTMLButtonElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);

  return (
    <RadixTooltip.Trigger
      asChild
      onFocus={(event) => {
        onFocus?.(event);
        if (event.defaultPrevented) {
          return;
        }

        if (
          auto &&
          innerRef.current &&
          !hasTruncatedContent(innerRef.current)
        ) {
          event.preventDefault();
        }
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        if (event.defaultPrevented) {
          return;
        }

        if (
          auto &&
          innerRef.current &&
          !hasTruncatedContent(innerRef.current)
        ) {
          event.preventDefault();
        }
      }}
      ref={ref}
      {...props}
    >
      <FilteredSlot exclude="data-state">
        {asChild ? children : <Button>{children}</Button>}
      </FilteredSlot>
    </RadixTooltip.Trigger>
  );
});

TooltipTrigger.displayName = "@optiaxiom/react/TooltipTrigger";

const hasTruncatedContent = (element: HTMLButtonElement) => {
  let truncated = false;

  const elements: Element[] = [element];
  while (!truncated && elements.length) {
    const element = elements.shift();
    if (!(element instanceof HTMLElement)) {
      continue;
    }
    const { offsetHeight, offsetWidth, scrollHeight, scrollWidth } = element;

    if (offsetWidth < scrollWidth || offsetHeight < scrollHeight) {
      truncated = true;
      break;
    }

    elements.push(...element.children);
  }

  return truncated;
};
