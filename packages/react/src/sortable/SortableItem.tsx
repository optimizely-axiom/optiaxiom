import { shapeIntersection } from "@dnd-kit/collision";
import { Feedback } from "@dnd-kit/dom";
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
     * Array index of the item within its list.
     */
    index: number;
    /**
     * The item that is being rendered: its ID, or an object with a `label`.
     */
    item:
      | string
      | {
          /**
           * ID of the item.
           */
          id: string;
          /**
           * Name screen readers announce while the item is dragged.
           */
          label: string;
        };
  }
>;

/**
 * One draggable item, rendered inside `Sortable` or a `SortableGroup`.
 *
 * @group Sortable
 */
export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ children, className, index, item, ...props }, outerRef) => {
    const id = typeof item === "string" ? item : item.id;
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
      // The clone leaves the source's full-size rect in place, so pointer
      // intersection would keep tall sources as the target until the pointer
      // exits them.
      collisionDetector: shapeIntersection,
      data: { label: typeof item === "string" ? item : item.label },
      group,
      handle: handleRef,
      id,
      index,
      plugins: (defaults) => [
        ...defaults,
        Feedback.configure({ feedback: "clone" }),
      ],
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
