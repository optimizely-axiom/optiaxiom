import { PopoverTrigger } from "@radix-ui/react-popover";
import { forwardRef, useEffect, useRef } from "react";

import { type ButtonProps } from "../button";
import { useFieldContext } from "../field-context";
import { MenuButton } from "../menu-button";
import { useSelectContext } from "../select-context";

type SelectTriggerProps = ButtonProps<typeof PopoverTrigger>;

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    const { disabled, downshift } = useSelectContext("SelectTrigger");

    const { labelId } = useFieldContext();
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      if (!labelId || !buttonRef.current) {
        return;
      }

      const button = buttonRef.current;
      const label = document.getElementById(labelId);
      if (!label) {
        return;
      }

      const onLabelClick = () => button.focus();
      label.addEventListener("click", onLabelClick);
      return () => label.removeEventListener("click", onLabelClick);
    }, [labelId]);

    return (
      <PopoverTrigger
        asChild
        ref={ref}
        {...props}
        {...downshift.getToggleButtonProps({ disabled })}
      >
        {asChild ? (
          children
        ) : (
          <MenuButton aria-labelledby={labelId} ref={buttonRef}>
            {children}
          </MenuButton>
        )}
      </PopoverTrigger>
    );
  },
);

SelectTrigger.displayName = "@optiaxiom/react/SelectTrigger";
