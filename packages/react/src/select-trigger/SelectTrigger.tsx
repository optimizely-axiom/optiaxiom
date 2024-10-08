import { PopoverAnchor, PopoverTrigger } from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { Button, type ButtonProps } from "../button";
import { IconAngleDown } from "../icons/IconAngleDown";
import { useSelectContext } from "../select-context";

type SelectTriggerProps = ButtonProps<typeof PopoverTrigger>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { disabled, downshift } = useSelectContext("SelectTrigger");

    return (
      <PopoverAnchor asChild>
        <PopoverTrigger
          asChild
          ref={ref}
          {...props}
          {...downshift.getToggleButtonProps({ disabled })}
        >
          {asChild ? (
            children
          ) : (
            <Button icon={<IconAngleDown />} iconPosition="end">
              {children}
            </Button>
          )}
        </PopoverTrigger>
      </PopoverAnchor>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
