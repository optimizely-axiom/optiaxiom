import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useCommandContext } from "../command-context";
import { FilteredSlot } from "../filtered-slot";
import { IconAngleRight } from "../icons/IconAngleRight";
import { MenuItem } from "../menu-item";
import { useMenuSubContext } from "../menu-sub-context";

type MenuSubTriggerProps = BoxProps<typeof MenuItem>;

export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  ({ children, item, onPointerDown, ...props }, ref) => {
    const { downshift, pauseInteractionRef } = useCommandContext(
      "@optiaxiom/react/MenuSubTrigger",
    );
    const { contentRef, open } = useMenuSubContext(
      "@optiaxiom/react/MenuSubTrigger",
    );

    return (
      <DropdownMenuTrigger asChild>
        <FilteredSlot exclude="disabled">
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
              downshift.selectItem(item);
            }}
            onPointerLeave={(event) => {
              const box = contentRef.current?.getBoundingClientRect();
              if (!box) {
                return;
              }

              pauseInteractionRef.current.triangle = {
                bottom: {
                  x: box.left,
                  y: box.top + box.height,
                },
                side: {
                  x: event.clientX + 10 * (box.left > event.clientX ? -1 : 1),
                  y: event.clientY,
                },
                top: {
                  x: box.left,
                  y: box.top,
                },
              };
            }}
            ref={ref}
            {...props}
          >
            {children}
          </MenuItem>
        </FilteredSlot>
      </DropdownMenuTrigger>
    );
  },
);

MenuSubTrigger.displayName = "@optiaxiom/react/MenuSubTrigger";
