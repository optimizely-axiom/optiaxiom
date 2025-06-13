import { type ComponentPropsWithoutRef, forwardRef } from "react";

import type { ExcludeProps } from "../utils";

import { ListboxItemized } from "../listbox";
import {
  type CommandOption,
  resolveItemProperty,
  useCommandContext,
} from "./CommandContext";

export type CommandListboxProps = ExcludeProps<
  ComponentPropsWithoutRef<typeof ListboxItemized>,
  "highlightedItem" | "items" | "itemToKey" | "onPlacedChange"
>;

export const CommandListbox = forwardRef<HTMLDivElement, CommandListboxProps>(
  ({ children, size, ...props }, ref) => {
    const {
      downshift,
      highlightedItem,
      highlightedItemRef,
      inputValue,
      items,
    } = useCommandContext("@optiaxiom/react/CommandListbox");

    return (
      <ListboxItemized
        highlightedItem={highlightedItem}
        items={items}
        itemToKey={(item: CommandOption) =>
          item.key ?? resolveItemProperty(item.label, { inputValue })
        }
        onPlacedChange={(placed) => {
          if (placed && highlightedItemRef.current) {
            highlightedItemRef.current.scrollIntoView({ block: "nearest" });
          }
        }}
        size={size}
        {...downshift.getMenuProps({ ref, ...props })}
      >
        {children}
      </ListboxItemized>
    );
  },
);

CommandListbox.displayName = "@optiaxiom/react/CommandListbox";
