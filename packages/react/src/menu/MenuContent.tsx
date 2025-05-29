import { useComposedRefs } from "@radix-ui/react-compose-refs";
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useRef,
} from "react";

import type { DialogContent } from "../dialog";
import type { PopoverContent } from "../popover";
import type { ExcludeProps } from "../utils";

import { useCommandContext } from "../command/internals";
import { useFieldContext } from "../field/internals";
import { VisuallyHidden } from "../visually-hidden";
import { useMenuContext } from "./MenuContext";
import { MenuDialogContent } from "./MenuDialogContent";
import { MenuInput } from "./MenuInput";
import { MenuListbox } from "./MenuListbox";
import { MenuPopoverContent } from "./MenuPopoverContent";
import { useMenuSubContext } from "./MenuSubContext";

export type MenuContentProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof DialogContent> &
    ComponentPropsWithoutRef<typeof PopoverContent>,
  "minW" | "size"
>;

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
  ({ children, onPointerDown, ...props }, outerRef) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const { labelId } = useFieldContext("@optiaxiom/react/MenuContent");
    const { activeItemStack, inputRef, inputVisible, placeholder, size } =
      useMenuContext("@optiaxiom/react/MenuContent");
    const { empty, loading } = useCommandContext(
      "@optiaxiom/react/MenuContent",
    );
    const { setOpen } = useMenuSubContext("@optiaxiom/react/MenuContent");
    const Comp = size === "sm" ? MenuPopoverContent : MenuDialogContent;

    useEffect(() => {
      innerRef.current?.animate([{ scale: 1 }, { scale: 0.97 }, { scale: 1 }], {
        duration: 150,
      });
    }, [activeItemStack]);

    return (
      <Comp
        aria-labelledby={labelId}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (
            event.target instanceof Element &&
            event.target.closest('[role="option"]')
          ) {
            return;
          }

          event.preventDefault();
          inputRef.current?.focus();
        }}
        overflow="hidden"
        p={size === "sm" ? "4" : "0"}
        ref={ref}
        {...props}
      >
        <VisuallyHidden disabled={inputVisible}>
          <MenuInput placeholder={placeholder} />
        </VisuallyHidden>
        <MenuListbox
          empty={empty}
          loading={loading}
          onScroll={() => setOpen(false)}
          p={size === "lg" ? "6" : "0"}
        >
          {children}
        </MenuListbox>
      </Comp>
    );
  },
);

MenuContent.displayName = "@optiaxiom/react/MenuContent";
