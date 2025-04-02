import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  forwardRef,
  type LegacyRef,
  type ReactElement,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Box, type BoxProps } from "../box";
import { Listbox } from "../listbox";
import { TransitionGroupContext } from "../transition-group-context";

type ListboxVirtualizedProps<T = unknown> = BoxProps<
  "div",
  {
    children: (item: T) => ReactNode;
    highlightedItem?: T;
    items: T[];
    ref?: LegacyRef<HTMLDivElement>;
  }
>;

export const ListboxVirtualized = forwardRef<
  HTMLDivElement,
  ListboxVirtualizedProps
>(({ children, highlightedItem, items, ...props }, outerRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const ref = useComposedRefs(outerRef, innerRef);

  /**
   * We wait for first paint before enabling virtualizer to ensure we render a
   * smaller set of data in actually visible in the overflow element rather than
   * trying to render the full list of items.
   */
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setEnabled(true));
  }, []);

  const { presence } = useContext(TransitionGroupContext) ?? {};

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
        flex="none"
        style={{
          minHeight: Math.min(items.length, 8) * 40,
          minWidth,
          paddingBottom,
          paddingTop,
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <Box
            data-index={virtualItem.index}
            key={virtualItem.key}
            ref={rowVirtualizer.measureElement}
          >
            {children(items[virtualItem.index])}
            {virtualItem.index < items.length - 1 && <Box pb="2" />}
          </Box>
        ))}
      </Box>
    </Listbox>
  );
}) as (<T>(props: ListboxVirtualizedProps<T>) => ReactElement) & {
  displayName: string;
};

ListboxVirtualized.displayName = "@optiaxiom/react/ListboxVirtualized";
