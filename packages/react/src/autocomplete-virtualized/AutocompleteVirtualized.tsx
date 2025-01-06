import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  forwardRef,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
} from "react";

import { Box, type BoxProps } from "../box";
import { useCommandContext } from "../command-context";
import { ListboxScrollArea } from "../listbox-scroll-area";

type AutocompleteVirtualizedProps<T = unknown> = BoxProps<
  "div",
  {
    children: (item: T) => ReactNode;
    items: T[];
  }
>;

export const AutocompleteVirtualized = forwardRef<
  HTMLDivElement,
  AutocompleteVirtualizedProps
>(({ children, items, ...props }, outerRef) => {
  const innerRef = useRef<HTMLDivElement>(null);
  const enabled = !!innerRef.current
    ?.closest<HTMLDivElement>("[data-radix-popper-content-wrapper]")
    ?.style.getPropertyValue("--radix-popper-available-height");
  const ref = useComposedRefs(outerRef, innerRef);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    enabled,
    estimateSize: () => 40,
    getScrollElement: () => innerRef.current,
  });

  const { downshift } = useCommandContext("AutocompleteVirtualized");
  useEffect(() => {
    rowVirtualizer.scrollToIndex(downshift.highlightedIndex);
  }, [downshift.highlightedIndex, rowVirtualizer]);

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
}) as (<T>(props: AutocompleteVirtualizedProps<T>) => ReactElement) & {
  displayName: string;
};

AutocompleteVirtualized.displayName =
  "@optiaxiom/react/AutocompleteVirtualized";
