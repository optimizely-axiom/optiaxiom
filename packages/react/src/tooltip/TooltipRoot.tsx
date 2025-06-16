import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithoutRef, useRef } from "react";

import { TooltipProvider } from "./TooltipContext";

export type TooltipRootProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Root
> & {
  /**
   * Enable this option to only show the tooltip when children is partially hidden due to text overflow.
   */
  auto?: boolean;
};

export function TooltipRoot({
  auto,
  children,
  defaultOpen = false,
  delayDuration,
  onOpenChange,
  open: openProp,
  ...props
}: TooltipRootProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useControllableState({
    caller: "@optiaxiom/react/TooltipRoot",
    defaultProp: defaultOpen,
    onChange: onOpenChange,
    prop: openProp,
  });

  return (
    <RadixTooltip.Root
      delayDuration={delayDuration}
      onOpenChange={
        openProp === undefined
          ? (open) => {
              if (
                auto &&
                open &&
                triggerRef.current &&
                !hasTruncatedContent(triggerRef.current)
              ) {
                return;
              }

              setOpen(open);
            }
          : setOpen
      }
      open={open}
      {...props}
    >
      <TooltipProvider open={open} setOpen={setOpen} triggerRef={triggerRef}>
        {children}
      </TooltipProvider>
    </RadixTooltip.Root>
  );
}

TooltipRoot.displayName = "@optiaxiom/react/TooltipRoot";

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
