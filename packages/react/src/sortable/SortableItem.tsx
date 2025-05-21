import { useSortable } from "@dnd-kit/react/sortable";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, type ReactNode, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSortableContext } from "./SortableContext";
import * as styles from "./SortableItem.css";
import { SortableItemProvider } from "./SortableItemContext";

export type SortableItemProps = BoxProps<
  "div",
  {
    children?: (() => ReactNode) | ReactNode;
  }
>;

export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ children, className, style, ...props }, outerRef) => {
    const { index, isSorting, item } = useSortableContext(
      "@optiaxiom/react/SortableItem",
    );
    const handleRef = useRef<HTMLDivElement>(null);
    const { isDragging, ref: innerRef } = useSortable({
      accept: "item",
      handle: handleRef,
      id: item,
      index,
      type: "item",
    });
    const ref = useComposedRefs(innerRef, outerRef);

    const cacheRef = useRef<ReactNode>();
    if (!isSorting || typeof children !== "function") {
      cacheRef.current = typeof children === "function" ? children() : children;
    }

    return (
      <SortableItemProvider
        handleRef={handleRef}
        id={item}
        isDragging={isDragging}
      >
        <Box
          ref={ref}
          style={{
            opacity: isDragging ? 0.5 : undefined,
            ...style,
          }}
          {...styles.item({ handle: !handleRef.current }, className)}
          {...props}
        >
          {cacheRef.current}
        </Box>
      </SortableItemProvider>
    );
  },
);

SortableItem.displayName = "@optiaxiom/react/SortableItem";
