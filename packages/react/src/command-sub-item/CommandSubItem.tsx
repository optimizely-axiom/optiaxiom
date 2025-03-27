import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandFocusableItem } from "../command-focusable-item";
import { useCommandSubContext } from "../command-sub-context";

type CommandSubItemProps = BoxProps<
  "div",
  {
    item: unknown;
    selected?: boolean;
  }
>;

export const CommandSubItem = forwardRef<HTMLDivElement, CommandSubItemProps>(
  (
    { children, item, onClick, onMouseDown, onMouseMove, selected, ...props },
    outerRef,
  ) => {
    const {
      downshift,
      highlightedItem,
      highlightedSubIndex,
      isItemDisabled,
      isItemSelected,
      items,
      itemToSubItems,
      setHighlightedIndex,
      setHighlightedSubIndex,
    } = useCommandContext("@optiaxiom/react/CommandSubItem");
    const { item: parentItem } = useCommandSubContext(
      "@optiaxiom/react/CommandSubItem",
    );
    const subItems = itemToSubItems?.(parentItem) ?? [];
    const highlightedSubItem =
      highlightedItem === parentItem && highlightedSubIndex !== -1
        ? subItems[highlightedSubIndex]
        : null;
    const index = items.indexOf(parentItem);
    const subIndex = subItems.indexOf(item);
    const disabled = isItemDisabled(item, subIndex);
    const highlighted = highlightedSubItem === item;
    const isSelected = selected ?? isItemSelected(item, index);

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useEffect(() => {
      if (innerRef.current && isSelected) {
        innerRef.current.scrollIntoView({ block: "nearest" });
      }
    }, [isSelected]);

    return (
      <CommandFocusableItem
        aria-disabled={disabled}
        aria-selected={isSelected}
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

          setHighlightedIndex(index, "pointer");
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
