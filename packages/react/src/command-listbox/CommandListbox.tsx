import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { useCommandContext } from "../command-context";
import { ListboxItemized } from "../listbox-itemized";

type CommandListboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ListboxItemized>,
  "highlightedItem" | "items" | "onPlacedChange" | "placed"
>;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, size, ...props }, ref) => {
    const { downshift, highlightedItem, items, placed, setPlaced } =
      useCommandContext("@optiaxiom/react/CommandListbox");

    return (
      <ListboxItemized
        highlightedItem={highlightedItem}
        items={items}
        onPlacedChange={setPlaced}
        placed={placed}
        size={size}
        {...downshift.getMenuProps({ ref, ...props })}
      >
        {children}
      </ListboxItemized>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
