import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentPropsWithRef, useRef } from "react";

import { type BoxProps } from "../box";
import { TooltipContextProvider } from "../tooltip-context";

type TooltipRootProps = BoxProps<
  typeof RadixTooltip.Root,
  {
    auto?: boolean;
    delayDuration?: ComponentPropsWithRef<
      typeof RadixTooltip.Provider
    >["delayDuration"];
    keepOpenOnActivation?: boolean;
  }
>;

export function TooltipRoot({
  auto,
  children,
  defaultOpen,
  delayDuration,
  keepOpenOnActivation,
  onOpenChange,
  open: openProp,
  ...props
}: TooltipRootProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useControllableState({
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
      <TooltipContextProvider
        keepOpenOnActivation={keepOpenOnActivation}
        open={open}
        setOpen={setOpen}
        triggerRef={triggerRef}
      >
        {children}
      </TooltipContextProvider>
    </RadixTooltip.Root>
  );
}

TooltipRoot.displayName = "@optiaxiom/react/TooltipRoot";
