import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import type { MenuContent } from "./MenuContent";

import { PopoverContent } from "../popover";
import { useMenuContext } from "./MenuContext";

export type MenuPopoverContentProps = ComponentPropsWithoutRef<
  typeof MenuContent
>;

export const MenuPopoverContent = forwardRef<
  HTMLDivElement,
  MenuPopoverContentProps
>(({ style, ...props }, outerRef) => {
  const { open } = useMenuContext("@optiaxiom/react/MenuPopoverContent");

  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(innerRef, outerRef);
  const [minHeight, setMinHeight] = useState(0);
  useEffect(() => {
    if (!open || props.side === "top") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMinHeight(entry.borderBoxSize[0].blockSize);
      }
    });

    setMinHeight(0);
    requestAnimationFrame(() => {
      if (innerRef.current?.dataset.side === "top") {
        observer.observe(innerRef.current);
      }
    });

    return () => observer.disconnect();
  }, [open, props.side]);

  return (
    <PopoverContent
      maxH="sm"
      minW="trigger"
      ref={ref}
      style={{ ...style, minHeight }}
      {...props}
    />
  );
});

MenuPopoverContent.displayName = "@optiaxiom/react/MenuPopoverContent";
