import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

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
    const { setOpen, size, triggerRef } = useMenuContext(
      "@optiaxiom/react/MenuTrigger",
    );
    const Comp = size === "sm" ? PopoverTrigger : DialogTrigger;

    const ref = useComposedRefs(outerRef, triggerRef);

    const id = useId();
    const labelId = useFieldLabelTrigger(triggerRef, ariaLabelledBy);

    return (
      <Comp
        aria-labelledby={labelId}
        asChild
        id={id}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }

          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
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
