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
import { useCommandContext } from "../command-context";
import { ListboxScrollArea } from "../listbox-scroll-area";

type ComboboxVirtualizedProps<T = unknown> = BoxProps<
  "div",
  {
    children: (item: T) => ReactNode;
    items: T[];
  }
>;

export const ComboboxVirtualized = forwardRef<
  HTMLDivElement,
  ComboboxVirtualizedProps
>(({ children, items, ...props }, outerRef) => {
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

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    enabled,
    estimateSize: () => 40,
    getScrollElement: () => innerRef.current,
  });

  const { highlightedItem } = useCommandContext(
    "@optiaxiom/react/ComboboxVirtualized",
  );
  const itemToIndexMap = useMemo(
    () => new Map(items.map((item, index) => [item, index])),
    [items],
  );
  useEffect(() => {
    const index = itemToIndexMap.get(highlightedItem);
    if (typeof index !== "number") {
      return;
    }
    rowVirtualizer.scrollToIndex(index);
  }, [enabled, highlightedItem, itemToIndexMap, rowVirtualizer]);

  return (
    <ListboxScrollArea ref={ref} {...props}>
      <Box
        display="flex"
        flex="none"
        flexDirection="column"
        gap="2"
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => (
          <Box
            key={virtualItem.key}
            style={{
              height: virtualItem.size,
              left: 0,
              position: "absolute",
              top: 0,
              transform: `translateY(${virtualItem.start}px)`,
            }}
            w="full"
          >
            {children(items[virtualItem.index])}
          </Box>
        ))}
      </Box>
    </ListboxScrollArea>
  );
}) as (<T>(props: ComboboxVirtualizedProps<T>) => ReactElement) & {
  displayName: string;
};

ComboboxVirtualized.displayName = "@optiaxiom/react/ComboboxVirtualized";
