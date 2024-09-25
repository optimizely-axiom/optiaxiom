import * as RadixSelect from "@radix-ui/react-select";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { Button } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";
import { useSelectContext } from "../select-context";
import { extractSprinkles } from "../sprinkles";

type SelectTriggerProps = ComponentPropsWithoutRef<typeof Button>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { triggerId } = useSelectContext("SelectTrigger");
    const { restProps, sprinkleProps } = extractSprinkles(props);

    return (
      <RadixSelect.Trigger asChild id={triggerId} ref={ref} {...sprinkleProps}>
        {asChild ? (
          children
        ) : (
          <Button icon={<IconAngleDown />} iconPosition="end" {...restProps}>
            {children}
          </Button>
        )}
      </RadixSelect.Trigger>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
