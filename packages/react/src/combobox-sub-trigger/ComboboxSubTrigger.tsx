import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { ComboboxItem } from "../combobox-item";
import { useComboboxSubContext } from "../combobox-sub-context";
import { useCommandContext } from "../command-context";
import { FilteredSlot } from "../filtered-slot";
import { IconAngleRight } from "../icons/IconAngleRight";

type ComboboxSubTriggerProps = BoxProps<typeof ComboboxItem>;

export const ComboboxSubTrigger = forwardRef<
  HTMLDivElement,
  ComboboxSubTriggerProps
>(({ children, item, onPointerDown, ...props }, ref) => {
  const { downshift, pauseInteractionRef } = useCommandContext(
    "@optiaxiom/react/ComboboxSubTrigger",
  );
  const { contentRef, open } = useComboboxSubContext(
    "@optiaxiom/react/ComboboxSubTrigger",
  );

  return (
    <DropdownMenuTrigger asChild>
      <FilteredSlot exclude="disabled">
        <ComboboxItem
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
        </ComboboxItem>
      </FilteredSlot>
    </DropdownMenuTrigger>
  );
});

ComboboxSubTrigger.displayName = "@optiaxiom/react/ComboboxSubTrigger";
