import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { CommandItemContextProvider } from "../command-item-context";
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
    const selected = highlightedSubItem === item;

    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);
    useEffect(() => {
      if (innerRef.current && selected) {
        innerRef.current.scrollIntoView({ block: "nearest" });
      }
    }, [selected]);

    return (
      <CommandItemContextProvider
        active={active ?? value?.has(item)}
        item={item}
      >
        <Box
          aria-disabled={disabled}
          aria-selected={selected}
          data-disabled={disabled ? "" : undefined}
          data-highlighted={selected ? "" : undefined}
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

            setHighlightedIndex(items.indexOf(parentItem));
            setHighlightedSubIndex(subIndex);
          }}
          ref={ref}
          role="option"
          {...props}
        >
          {children}
        </Box>
      </CommandItemContextProvider>
    );
  },
);

CommandSubItem.displayName = "@optiaxiom/react/CommandSubItem";
