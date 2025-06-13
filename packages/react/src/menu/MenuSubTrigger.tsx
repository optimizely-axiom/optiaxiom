import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { type BoxProps } from "../box";
import { useCommandContext } from "../command/internals";
import { IconAngleRight } from "../icons/IconAngleRight";
import { usePopoverContext } from "../popover/internals";
import { MenuItem } from "./MenuItem";
import { useMenuSubContext } from "./MenuSubContext";

export type MenuSubTriggerProps = BoxProps<typeof MenuItem>;

export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  (
    {
      children,
      item,
      onPointerDown,
      onPointerEnter,
      onPointerLeave,
      onPointerMove,
      ...props
    },
    outerRef,
  ) => {
    const { downshift, enabled, highlightedItem, pauseInteractionRef } =
      useCommandContext("@optiaxiom/react/MenuSubTrigger");
    const { open } = usePopoverContext("@optiaxiom/react/MenuSubTrigger");
    const { contentRef, itemRef } = useMenuSubContext(
      "@optiaxiom/react/MenuSubTrigger",
    );

    /**
     * We use a ref and combine pointerenter + pointermove because pointerenter
     * is triggered both when mouse moves into the element and also when element
     * is inserted into DOM and mouse happens to be present at that coordinate.
     *
     * So we only open the submenu when user moves the enters and then moves
     * the mouse for the first time.
     */
    const pointerEnterRef = useRef(false);

    const innerRef = useRef();
    const ref = useComposedRefs(innerRef, outerRef);
    useEffect(() => {
      if (open && highlightedItem === item && innerRef.current) {
        itemRef.current = innerRef.current;
      }
    }, [highlightedItem, item, open, itemRef]);

    return (
      <MenuItem
        addonAfter={<IconAngleRight />}
        item={item}
        onPointerDown={(event) => {
          onPointerDown?.(event);
          if (open) {
            event.preventDefault();
          }
        }}
        onPointerEnter={(event) => {
          onPointerEnter?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (highlightedItem === item) {
            pointerEnterRef.current = true;
          }
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event);
          pointerEnterRef.current = false;
          const box = contentRef.current?.getBoundingClientRect();
          if (!box) {
            return;
          }
          if (pauseInteractionRef.current.isInsideTriangle) {
            return;
          }

          const bottom = {
            x: box.left,
            y: box.top + box.height,
          };
          const side = {
            x: event.clientX + 10 * (box.left > event.clientX ? -1 : 1),
            y: event.clientY,
          };
          const top = {
            x: box.left,
            y: box.top,
          };
          pauseInteractionRef.current.isInsideTriangle = (target) => {
            const b0 =
                (top.x - side.x) * (bottom.y - side.y) -
                (bottom.x - side.x) * (top.y - side.y),
              b1 =
                ((top.x - target.x) * (bottom.y - target.y) -
                  (bottom.x - target.x) * (top.y - target.y)) /
                b0,
              b2 =
                ((bottom.x - target.x) * (side.y - target.y) -
                  (side.x - target.x) * (bottom.y - target.y)) /
                b0,
              b3 =
                ((side.x - target.x) * (top.y - target.y) -
                  (top.x - target.x) * (side.y - target.y)) /
                b0;

            return b1 > 0 && b2 > 0 && b3 > 0;
          };
          pauseInteractionRef.current.timer = window.setTimeout(() => {
            pauseInteractionRef.current.isInsideTriangle = null;
          }, 20);
        }}
        onPointerMove={(event) => {
          onPointerMove?.(event);
          if (event.defaultPrevented) {
            return;
          }

          if (pointerEnterRef.current && enabled) {
            downshift.selectItem(item);
          }
          pointerEnterRef.current = false;
        }}
        ref={ref}
        {...props}
      >
        {children}
      </MenuItem>
    );
  },
);

MenuSubTrigger.displayName = "@optiaxiom/react/MenuSubTrigger";
