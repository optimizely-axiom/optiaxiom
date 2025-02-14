import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef, useEffect, useState } from "react";

import { Button, type ButtonProps } from "../button";
import { usePopoverContext } from "../popover-context";

type PopoverTriggerProps = ButtonProps<
  typeof RadixPopover.Trigger,
  {
    hasCustomAnchor?: boolean;
  }
>;

export const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ asChild, children, hasCustomAnchor, ...props }, ref) => {
  const { presence } = usePopoverContext("PopoverTrigger");

  const [shouldRender, setShouldRender] = useState(!hasCustomAnchor);
  useEffect(() => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  }, [shouldRender]);

  return (
    shouldRender && (
      <RadixPopover.Trigger
        asChild
        data-expanded={presence ? "" : undefined}
        ref={ref}
        {...props}
      >
        {asChild ? children : <Button>{children}</Button>}
      </RadixPopover.Trigger>
    )
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
