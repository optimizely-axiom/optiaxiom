import { useComposedRefs } from "@radix-ui/react-compose-refs";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { FilteredSlot } from "../filtered-slot";
import { useTooltipContext } from "../tooltip-context";

type TooltipTriggerProps = ComponentPropsWithoutRef<
  typeof RadixTooltip.Trigger
>;

export const TooltipTrigger = forwardRef<
  HTMLButtonElement,
  TooltipTriggerProps
>(({ asChild, children, ...props }, outerRef) => {
  const { triggerRef } = useTooltipContext("TooltipTrigger");
  const ref = useComposedRefs(triggerRef, outerRef);

  return (
    <RadixTooltip.Trigger asChild ref={ref} {...props}>
      <FilteredSlot exclude="data-state">
        {asChild ? children : <Button>{children}</Button>}
      </FilteredSlot>
    </RadixTooltip.Trigger>
  );
});

TooltipTrigger.displayName = "@optiaxiom/react/TooltipTrigger";
