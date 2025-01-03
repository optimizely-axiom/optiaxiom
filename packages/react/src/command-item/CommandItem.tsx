import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useCommandContext } from "../command-context";
import { CommandFocusableItem } from "../command-focusable-item";

type CommandItemProps = BoxProps<
  "div",
  {
    /**
     * The exact item object from the collection.
     */
    item: unknown;
    /**
     * Whether to override the default selected state.
     */
    selected?: boolean;
  }
>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ children, item, selected, size, ...props }, ref) => {
    const { downshift, highlightedItem, value } =
      useCommandContext("CommandItem");
    const itemProps = downshift.getItemProps({
      "aria-selected": selected ?? value?.has(item),
      item,
      ...props,
    });

    return (
      <CommandFocusableItem
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        ref={ref}
        size={size}
        tabIndex={-1}
        {...itemProps}
      >
        {children}
      </CommandFocusableItem>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
