import { Popover as RadixPopover } from "radix-ui";
import { forwardRef, useEffect, useState } from "react";

import { Button, type ButtonProps } from "../button";

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
  const [shouldRender, setShouldRender] = useState(!hasCustomAnchor);
  useEffect(() => {
    if (!shouldRender) {
      setShouldRender(true);
    }
  }, [shouldRender]);

  return (
    shouldRender && (
      <RadixPopover.Trigger asChild ref={ref} {...props}>
        {asChild ? children : <Button>{children}</Button>}
      </RadixPopover.Trigger>
    )
  );
});

PopoverTrigger.displayName = "@optiaxiom/react/PopoverTrigger";
