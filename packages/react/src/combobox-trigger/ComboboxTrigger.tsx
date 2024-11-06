import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { useComboboxContext } from "../combobox-context";
import { useFieldContext } from "../field-context";
import { MenuButton } from "../menu-button";
import { PopoverTrigger } from "../popover-trigger";

type ComboboxTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ asChild, children, ...props }, outerRef) => {
  const { setOpen } = useComboboxContext("ComboboxTrigger");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const ref = useComposedRefs(outerRef, buttonRef);

  const { labelId } = useFieldContext();
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
      aria-labelledby={labelId}
      asChild
      onKeyDown={(event) => {
        switch (event.key) {
          case "ArrowDown":
          case "ArrowUp":
            setOpen(true);
        }
      }}
      ref={ref}
      role="combobox"
      {...props}
    >
      {asChild ? children : <MenuButton>{children}</MenuButton>}
    </PopoverTrigger>
  );
});

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";
