import { useSortable } from "@dnd-kit/react/sortable";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useEffect, useRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSortableContext } from "./SortableContext";
import { useSortableGroupContext } from "./SortableGroupContext";
import * as styles from "./SortableItem.css";
import { SortableItemProvider } from "./SortableItemContext";

export type SortableItemProps = BoxProps<
  "div",
  {
    /**
     * Array index of the item that is being rendered.
     */
    index: number;
    /**
     * ID of the item that is being rendered.
     */
    item: string;
  }
>;

export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ children, className, index, item: id, ...props }, outerRef) => {
    const { cacheRef, isSorting } = useSortableContext(
      "@optiaxiom/react/SortableItem",
    );
    const { id: group, setHasDropTarget } = useSortableGroupContext(
      "@optiaxiom/react/SortableItem",
    );

    const handleRef = useRef<HTMLDivElement>(null);
    const {
      isDragging,
      isDropTarget,
      ref: innerRef,
    } = useSortable({
      accept: "item",
      feedback: "clone",
      group,
      handle: handleRef,
      id,
      index,
      type: "item",
    });
    useEffect(() => {
      if (!isDropTarget) {
        return;
      }

      setHasDropTarget(true);
      return () => setHasDropTarget(false);
    }, [setHasDropTarget, id, isDropTarget]);

    const ref = useComposedRefs(innerRef, outerRef);

    if (!isSorting) {
      cacheRef.current.set(id, children);
    }

    return (
      <SortableItemProvider handleRef={handleRef} isDragging={isDragging}>
        <Box
          data-sortable-dragging={isDragging ? "" : undefined}
          ref={ref}
          {...styles.item({ handle: !handleRef.current }, className)}
          {...props}
        >
          {cacheRef.current.get(id)}
        </Box>
      </SortableItemProvider>
    );
  },
);

SortableItem.displayName = "@optiaxiom/react/SortableItem";
