import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandFocusableItem } from "../command-focusable-item";
import { useCommandSubContext } from "../command-sub-context";

type CommandSubItemProps = BoxProps<
  "div",
  {
    active?: boolean;
    item: unknown;
  }
>;

export const CommandSubItem = forwardRef<HTMLDivElement, CommandSubItemProps>(
  (
    { active, children, item, onClick, onMouseDown, onMouseMove, ...props },
    outerRef,
  ) => {
    const {
      downshift,
      highlightedItem,
      highlightedSubIndex,
      isItemDisabled,
      items,
      itemToSubItems,
      setHighlightedIndex,
      setHighlightedSubIndex,
      value,
    } = useCommandContext("CommandSubItem");
    const { item: parentItem } = useCommandSubContext("CommandSubItem");
    const subItems = itemToSubItems?.(parentItem) ?? [];
    const highlightedSubItem =
      highlightedItem === parentItem && highlightedSubIndex !== -1
        ? subItems[highlightedSubIndex]
        : null;
    const subIndex = subItems.indexOf(item);
    const disabled = isItemDisabled(item, subIndex);
    const highlighted = highlightedSubItem === item;
    const selected = active ?? value?.has(item);

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useEffect(() => {
      if (innerRef.current && selected) {
        innerRef.current.scrollIntoView({ block: "nearest" });
      }
    }, [selected]);

    return (
      <CommandFocusableItem
        aria-disabled={disabled}
        aria-selected={selected}
        data-disabled={disabled ? "" : undefined}
        data-highlighted={highlighted ? "" : undefined}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) {
            return;
          }

          event.preventDefault();
          downshift.selectItem(item);
        }}
        onMouseDown={(event) => {
          onMouseDown?.(event);
          event.preventDefault();
        }}
        onMouseMove={(event) => {
          onMouseMove?.(event);
          if (event.defaultPrevented) {
            return;
          }

          setHighlightedIndex(items.indexOf(parentItem), "pointer");
          setHighlightedSubIndex(subIndex, "pointer");
        }}
        ref={ref}
        role="option"
        {...props}
      >
        {children}
      </CommandFocusableItem>
    );
  },
);

CommandSubItem.displayName = "@optiaxiom/react/CommandSubItem";
