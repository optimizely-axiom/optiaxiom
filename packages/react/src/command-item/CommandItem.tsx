import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useCommandContext } from "../command-context";
import { CommandFocusableItem } from "../command-focusable-item";
import { extractSprinkles } from "../sprinkles";

type CommandItemProps = BoxProps<
  "div",
  {
    active?: boolean;
    item: unknown;
  }
>;

export const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ active, children, item, ...props }, ref) => {
    const { restProps, sprinkleProps } = extractSprinkles(props);

    const { downshift, highlightedItem, value } =
      useCommandContext("CommandItem");
    const itemProps = downshift.getItemProps({
      "aria-selected": active ?? value?.has(item),
      item,
      ...restProps,
    });

    return (
      <CommandFocusableItem
        data-disabled={itemProps["aria-disabled"] ? "" : undefined}
        data-highlighted={highlightedItem === item ? "" : undefined}
        ref={ref}
        tabIndex={-1}
        {...sprinkleProps}
        {...itemProps}
      >
        {children}
      </CommandFocusableItem>
    );
  },
);

CommandItem.displayName = "@optiaxiom/react/CommandItem";
