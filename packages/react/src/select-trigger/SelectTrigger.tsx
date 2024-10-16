import { PopoverAnchor, PopoverTrigger } from "@radix-ui/react-popover";
import { forwardRef } from "react";

import { type ButtonProps } from "../button";
import { MenuButton } from "../menu-button";
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
          {asChild ? children : <MenuButton>{children}</MenuButton>}
        </PopoverTrigger>
      </PopoverAnchor>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
