import * as RadixPopover from "@radix-ui/react-popover";
import { forwardRef, useEffect, useState } from "react";

import { Button, type ButtonProps } from "../button";

export type PopoverTriggerProps = ButtonProps<
  typeof RadixPopover.Trigger,
  {
    /**
     * Declare whether the trigger is already contained within a custom anchor or not.
     *
     * Needed to prevent DOM mount/re-mount by radix as it tries to detect this automatically. Which ultimately leads to the ref changing and causing clicks to not work correctly during first mount.
     */
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
