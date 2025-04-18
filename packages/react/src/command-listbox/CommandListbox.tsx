import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "../command-context";
import { ListboxItemized } from "../listbox-itemized";

type CommandListboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ListboxItemized>,
  "highlightedItem" | "items" | "itemToKey" | "onPlacedChange" | "placed"
>;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, size, ...props }, ref) => {
    const { downshift, highlightedItem, inputValue, items, placed, setPlaced } =
      useCommandContext("@optiaxiom/react/CommandListbox");

    return (
      <ListboxItemized
        highlightedItem={highlightedItem}
        items={items}
        itemToKey={(item: CommandOption) =>
          item.key ?? resolveItemProperty(item.label, { inputValue })
        }
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
