import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useId } from "@radix-ui/react-id";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { AngleMenuButton } from "../angle-menu-button";
import { DialogTrigger } from "../dialog";
import { useFieldLabelTrigger } from "../hooks";
import { PopoverTrigger } from "../popover";
import { useMenuContext } from "./MenuContext";

export type MenuTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;

/**
 * Trigger button for Menu component with automatic chevron icon.
 *
 * Use this as the trigger for Menu dropdowns. By default, renders an
 * AngleMenuButton (button with trailing chevron). Use asChild to customize the
 * trigger button.
 *
 * @example
 * <MenuTrigger asChild><EllipsisMenuButton /></MenuTrigger>
 *
 * @extends Button
 * @group Menu
 */
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
    const { setFocusVisible, setOpen, size, triggerRef } = useMenuContext(
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
              setFocusVisible(true);
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
