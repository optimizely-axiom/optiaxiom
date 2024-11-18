import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { useCommandContext } from "../command-context";
import { CommandFocusableItem } from "../command-focusable-item";
import { extractSprinkles } from "../sprinkles";

type CommandUnstyledItemProps = BoxProps<
  "div",
  {
    item: unknown;
  }
>;

export const CommandUnstyledItem = forwardRef<
  HTMLDivElement,
  CommandUnstyledItemProps
>(({ children, item, ...props }, ref) => {
  const { restProps, sprinkleProps } = extractSprinkles(props);

  const { downshift, highlightedItem } = useCommandContext(
    "CommandUnstyledItem",
  );
  const itemProps = downshift.getItemProps({ item, ...restProps });

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
});

CommandUnstyledItem.displayName = "@optiaxiom/react/CommandUnstyledItem";
