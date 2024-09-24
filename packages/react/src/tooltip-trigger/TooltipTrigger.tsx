import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { extractSprinkles } from "../sprinkles";
import { useTooltipContext } from "../tooltip-context";

type TooltipTriggerProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Trigger
>;

export const TooltipTrigger = forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(({ asChild, children, ...props }, outerRef) => {
  const { keepOpenOnActivation, setOpen, triggerRef } =
    useTooltipContext("TooltipTrigger");

  const ref = useComposedRefs(triggerRef, outerRef);
  const { restProps, sprinkleProps } = extractSprinkles(props);

  return (
    <RadixTooltip.Trigger
      asChild
      onClick={
        keepOpenOnActivation
          ? (event) => {
              event.preventDefault();
              setOpen(true);
            }
          : undefined
      }
      ref={ref}
      {...sprinkleProps}
    >
      {asChild ? children : <Button {...restProps}>{children}</Button>}
    </RadixTooltip.Trigger>
  );
});

TooltipTrigger.displayName = "@optiaxiom/react/TooltipTrigger";
