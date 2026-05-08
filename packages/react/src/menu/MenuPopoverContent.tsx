import { useModalContext } from "@optiaxiom/globals";
import { useId } from "@radix-ui/react-id";
import { createSlot } from "@radix-ui/react-slot";
import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useLayoutEffect,
  useState,
} from "react";
import { RemoveScroll } from "react-remove-scroll";

import type { MenuContent } from "./MenuContent";

import { useFieldContext } from "../field/internals";
import { PopoverContent } from "../popover";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";

const Slot = createSlot("@optiaxiom/react/MenuPopoverContent");

export type MenuPopoverContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuPopoverContent = forwardRef<
  HTMLDivElement,
  MenuPopoverContentProps
>(({ align, "aria-label": ariaLabel, children, ...props }, ref) => {
  const { shardRef } = useModalContext("@optiaxiom/react/MenuPopoverContent");
  const { labelId: fieldLabelId } = useFieldContext(
    "@optiaxiom/react/MenuPopoverContent",
  );
  const { triggerRef } = useMenuContext("@optiaxiom/react/MenuPopoverContent");
  const labelId = useId();

  const [resolvedAlign, setResolvedAlign] = useState(align);
  useLayoutEffect(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      const center = rect.left + rect.width / 2;
      setResolvedAlign(center > window.innerWidth * 0.75 ? "end" : "start");
    }
  }, [align, triggerRef]);

  const content = (
    <PopoverContent
      align={align ?? resolvedAlign}
      aria-labelledby={clsx(fieldLabelId ?? triggerRef.current?.id, labelId)}
      ref={ref}
      {...props}
    >
      <VisuallyHidden id={labelId}>{ariaLabel || "Menu"}</VisuallyHidden>
      {children}
    </PopoverContent>
  );
  if (shardRef.current) {
    /**
     * Handle scroll locking when menu is used within a modal.
     */
    return (
      <RemoveScroll allowPinchZoom as={Slot} shards={[shardRef]}>
        {content}
      </RemoveScroll>
    );
  } else {
    return content;
  }
});

MenuPopoverContent.displayName = "@optiaxiom/react/MenuPopoverContent";
