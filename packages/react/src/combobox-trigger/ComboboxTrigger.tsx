import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { useComboboxContext } from "../combobox-context";
import { DialogTrigger } from "../dialog-trigger";
import { PopoverTrigger } from "../popover-trigger";
import { useFieldLabelTrigger } from "../use-field-label-trigger";

type ComboboxTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export const ComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ComboboxTriggerProps
>(
  (
    { "aria-labelledby": ariaLabelledBy, asChild, children, ...props },
    outerRef,
  ) => {
    const { setOpen, size } = useComboboxContext(
      "@optiaxiom/react/ComboboxTrigger",
    );
    const Comp = size === "sm" ? PopoverTrigger : DialogTrigger;

    const buttonRef = useRef<HTMLButtonElement>(null);
    const ref = useComposedRefs(outerRef, buttonRef);

    const labelId = useFieldLabelTrigger(buttonRef, ariaLabelledBy);

    return (
      <Comp
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
        {...props}
      >
        {asChild ? children : <AngleMenuButton>{children}</AngleMenuButton>}
      </Comp>
    );
  },
);

ComboboxTrigger.displayName = "@optiaxiom/react/ComboboxTrigger";
