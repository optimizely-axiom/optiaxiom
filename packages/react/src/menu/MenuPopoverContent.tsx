import { useId } from "@radix-ui/react-id";
import clsx from "clsx";
import { type ComponentPropsWithoutRef, forwardRef, useEffect } from "react";

import type { MenuContent } from "./MenuContent";

import { useFieldContext } from "../field/internals";
import { PopoverContent } from "../popover";
import { usePopoverContext } from "../popover/internals";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";

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
  const { inputRef, triggerRef } = useMenuContext(
    "@optiaxiom/react/MenuPopoverContent",
  );
  const { presence } = usePopoverContext("@optiaxiom/react/MenuPopoverContent");
  const labelId = useId();

  useEffect(() => {
    if (presence) {
      inputRef.current?.focus();
    }
  }, [inputRef, presence]);

  return (
    <PopoverContent
      aria-labelledby={clsx(fieldLabelId ?? triggerRef.current?.id, labelId)}
      onOpenAutoFocus={(event) => event.preventDefault()}
      ref={ref}
      {...props}
    >
      <VisuallyHidden id={labelId}>{ariaLabel || "Menu"}</VisuallyHidden>
      {children}
    </PopoverContent>
  );
});

MenuPopoverContent.displayName = "@optiaxiom/react/MenuPopoverContent";
