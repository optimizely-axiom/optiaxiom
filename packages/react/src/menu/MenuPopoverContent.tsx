import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { MenuContent } from "./MenuContent";

import { useFieldContext } from "../field/internals";
import { PopoverContent } from "../popover";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";
import { MenuPopoverContentImpl } from "./MenuPopoverContentImpl";

export type MenuPopoverContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuPopoverContent = forwardRef<
  HTMLDivElement,
  MenuPopoverContentProps
>(({ "aria-label": ariaLabel, children, ...props }, ref) => {
  const { labelId: fieldLabelId } = useFieldContext(
    "@optiaxiom/react/MenuPopoverContent",
  );
  const { triggerRef } = useMenuContext("@optiaxiom/react/MenuPopoverContent");
  const labelId = useId();

  return (
    <PopoverContent
      aria-labelledby={clsx(fieldLabelId ?? triggerRef.current?.id, labelId)}
      asChild
      ref={ref}
      {...props}
    >
      <MenuPopoverContentImpl>
        <VisuallyHidden id={labelId}>{ariaLabel || "Menu"}</VisuallyHidden>
        {children}
      </MenuPopoverContentImpl>
    </PopoverContent>
  );
});

MenuPopoverContent.displayName = "@optiaxiom/react/MenuPopoverContent";
