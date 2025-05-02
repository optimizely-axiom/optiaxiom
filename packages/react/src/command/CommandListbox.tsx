import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { ListboxItemized } from "../listbox";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "./CommandContext";

type CommandListboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ListboxItemized>,
  "highlightedItem" | "items" | "itemToKey" | "onPlacedChange"
>;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, size, ...props }, ref) => {
    const { downshift, highlightedItem, inputValue, items } = useCommandContext(
      "@optiaxiom/react/CommandListbox",
    );

    return (
      <ListboxItemized
        highlightedItem={highlightedItem}
        items={items}
        itemToKey={(item: CommandOption) =>
          item.key ?? resolveItemProperty(item.label, { inputValue })
        }
        size={size}
        {...downshift.getMenuProps({ ref, ...props })}
      >
        {children}
      </ListboxItemized>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
