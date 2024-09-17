import { PopoverAnchor, PopoverTrigger } from "@radix-ui/react-popover";
import { type ComponentPropsWithRef, forwardRef } from "react";

type AutocompleteTriggerProps = ComponentPropsWithRef<typeof PopoverTrigger>;

export const AutocompleteTrigger = forwardRef<
  HTMLButtonElement,
  AutocompleteTriggerProps
>(({ children, ...props }, ref) => {
  return (
    // https://github.com/radix-ui/primitives/issues/1461
    <PopoverAnchor>
      <PopoverTrigger asChild ref={ref} type={undefined} {...props}>
        {children}
      </PopoverTrigger>
    </PopoverAnchor>
  );
});

AutocompleteTrigger.displayName = "@optiaxiom/react/AutocompleteTrigger";
