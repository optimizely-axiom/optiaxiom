import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { DialogTrigger } from "../dialog-trigger";
import { useMenuContext } from "../menu-context";
import { PopoverTrigger } from "../popover-trigger";
import { useFieldLabelTrigger } from "../use-field-label-trigger";

type MenuTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  (
    { "aria-labelledby": ariaLabelledBy, asChild, children, ...props },
    outerRef,
  ) => {
    const { setOpen, size } = useMenuContext("@optiaxiom/react/MenuTrigger");
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

MenuTrigger.displayName = "@optiaxiom/react/MenuTrigger";
