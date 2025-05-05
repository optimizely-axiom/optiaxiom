import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useRef } from "react";

import { type BoxProps } from "../box";
import { TooltipProvider } from "./TooltipContext";

export type TooltipRootProps = BoxProps<
  typeof RadixTooltip.Root,
  {
    auto?: boolean;
  }
>;

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
          ? (flag) => {
              if (auto && flag && triggerRef.current) {
                let truncated = false;

                const elements: Element[] = [triggerRef.current];
                while (!truncated && elements.length) {
                  const element = elements.shift();
                  if (!(element instanceof HTMLElement)) {
                    continue;
                  }
                  const { offsetWidth, scrollWidth } = element;

                  if (offsetWidth < scrollWidth) {
                    truncated = true;
                    break;
                  }

                  elements.push(...element.children);
                }

                if (!truncated) {
                  return;
                }
              }

              setOpen(flag);
              onOpenChange?.(flag);
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
