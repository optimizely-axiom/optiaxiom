import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { type ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { DialogTrigger } from "../dialog";
import { useFieldLabelTrigger } from "../hooks";
import { PopoverTrigger } from "../popover";
import { useMenuContext } from "./MenuContext";

export type MenuTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  (
    {
      "aria-labelledby": ariaLabelledBy,
      asChild,
      children,
      onKeyDown,
      ...props
    },
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
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }

          switch (event.key) {
            case "ArrowDown":
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
