import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { useComboboxContext } from "../combobox-context";
import { useFieldContext } from "../field-context";
import { PopoverTrigger } from "../popover-trigger";

type ComboboxTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(({ asChild, children, ...props }, outerRef) => {
  const { components, setOpen } = useComboboxContext("ComboboxTrigger");

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
    <components.Trigger
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
      {asChild ? children : <AngleMenuButton>{children}</AngleMenuButton>}
    </components.Trigger>
  );
});

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";
