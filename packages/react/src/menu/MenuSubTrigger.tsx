import { forwardRef, type RefObject } from "react";

import type { BoxProps } from "../box";

import { useCommandContext } from "../command/internals";
import { FilteredSlot } from "../filtered-slot";
import { IconAngleRight } from "../icons/IconAngleRight";
import { PopoverTrigger } from "../popover";
import { usePopoverContext } from "../popover/internals";
import { MenuItem } from "./MenuItem";

type MenuSubTriggerProps = BoxProps<
  typeof MenuItem,
  {
    contentRef: RefObject<HTMLDivElement>;
  }
>;

export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, contentRef, item, onPointerDown, ...props }, ref) => {
    const { downshift, highlightedItem, pauseInteractionRef } =
      useCommandContext("@optiaxiom/react/MenuSubTrigger");
    const { open } = usePopoverContext("@optiaxiom/react/MenuSubTrigger");

    return (
      <PopoverTrigger asChild>
        <FilteredSlot exclude="type">
          <MenuItem
            addonAfter={<IconAngleRight />}
            item={item}
            onPointerDown={(event) => {
              onPointerDown?.(event);
              if (open) {
                event.preventDefault();
              }
            }}
            onPointerEnter={() => {
              if (highlightedItem !== item) {
                return;
              }

              downshift.selectItem(item);
            }}
            onPointerLeave={(event) => {
              const box = contentRef.current?.getBoundingClientRect();
              if (!box) {
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
            ref={ref}
            {...props}
          >
            {children}
          </MenuItem>
        </FilteredSlot>
      </PopoverTrigger>
    );
  },
);

MenuSubTrigger.displayName = "@optiaxiom/react/MenuSubTrigger";
