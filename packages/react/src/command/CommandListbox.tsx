import { type ComponentPropsWithoutRef, forwardRef, useState } from "react";

import type { ExcludeProps } from "../utils";

import { ListboxItemized } from "../listbox";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "./CommandContext";

type CommandListboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ListboxItemized>,
  "highlightedItem" | "items" | "itemToKey" | "onPlacedChange" | "placed"
>;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, size, ...props }, ref) => {
    const { downshift, highlightedItem, inputValue, items } = useCommandContext(
      "@optiaxiom/react/CommandListbox",
    );
    const [placed, setPlaced] = useState(false);

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
