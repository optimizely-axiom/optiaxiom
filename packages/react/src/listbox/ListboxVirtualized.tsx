import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  forwardRef,
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, type BoxProps } from "../box";
import { useTransitionGroupContext } from "../transition/internals";
import { Listbox } from "./Listbox";

export type ListboxVirtualizedProps<T = unknown> = BoxProps<
  "div",
  {
    children: (item: T, index: number, prevItem: T | undefined) => ReactNode;
    /**
     * The currently highlighted item.
     */
    highlightedItem?: T;
    /**
     * The collection of items to display.
     */
    items: readonly T[] | T[];
    /**
     * Function to get the unique key for each item as a string.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemToKey: (item: any) => string;
  }
>;

export const ListboxVirtualized = forwardRef<
  HTMLDivElement,
  ListboxVirtualizedProps
>(({ children, highlightedItem, items, itemToKey, ...props }, outerRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(outerRef, innerRef);

  /**
   * We wait for first paint to render the menu and then another paint for
   * radix popper to place the menu and set the max-height. Otherwise virtualizer
   * will try to render the full list of items instead of a smaller set of data
   * that is actually visible in the overflow element.
   */
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setEnabled(true)));
  }, []);

  const { presence } =
    useTransitionGroupContext("@optiaxiom/react/ListboxVirtualized") ?? {};

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    enabled,
    estimateSize: () => 40,
    getScrollElement: () => innerRef.current,
  });

  const itemToIndexMap = useMemo(
    () => new Map(items.map((item, index) => [item, index])),
    [items],
  );
  useEffect(() => {
    const index = itemToIndexMap.get(highlightedItem);
    if (!presence || typeof index !== "number" || rowVirtualizer.isScrolling) {
      return;
    }
    rowVirtualizer.scrollToIndex(index);
  }, [presence, highlightedItem, itemToIndexMap, rowVirtualizer]);

  const virtualItems = rowVirtualizer.getVirtualItems();
  const [paddingTop, paddingBottom] =
    virtualItems.length > 0
      ? [
          Math.max(0, virtualItems[0].start),
          Math.max(
            0,
            rowVirtualizer.getTotalSize() -
              virtualItems[virtualItems.length - 1].end,
          ),
        ]
      : [0, 0];

  const [minWidth, setMinWidth] = useState(0);
  useEffect(() => {
    if (!innerRef.current) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setMinWidth(entry.contentRect.width);
      }
    });
    observer.observe(innerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Listbox ref={ref} {...props}>
      <Box
        display="flex"
        flex="none"
        flexDirection="column"
        gap="2"
        style={{
          minHeight: Math.min(items.length, 8) * 40,
          minWidth,
          paddingBottom,
          paddingTop,
        }}
      >
        {virtualItems.map((virtualItem) => (
          <Box
            data-index={virtualItem.index}
            key={itemToKey(items[virtualItem.index])}
            ref={rowVirtualizer.measureElement}
          >
            {children(
              items[virtualItem.index],
              virtualItem.index,
              items[virtualItem.index - 1],
            )}
          </Box>
        ))}
      </Box>
    </Listbox>
  );
}) as (<T>(props: ListboxVirtualizedProps<T>) => ReactElement) & {
  displayName: string;
};

ListboxVirtualized.displayName = "@optiaxiom/react/ListboxVirtualized";
