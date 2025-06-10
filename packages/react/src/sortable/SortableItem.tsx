import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSortableContext } from "./SortableContext";
import * as styles from "./SortableItem.css";
import { useSortableItemContainerContext } from "./SortableItemContainerContext";

export type SortableItemProps = BoxProps<"div">;

export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ children, className, ...props }, outerRef) => {
    const { cacheRef, isSorting } = useSortableContext(
      "@optiaxiom/react/SortableItem",
    );
    const { elementRef, handleRef, id, isDragging } =
      useSortableItemContainerContext("@optiaxiom/react/SortableItem");
    if (!id) {
      throw new Error(
        `\`@optiaxiom/react/SortableItem\` needs an additional \`@optiaxiom/react/SortableList\``,
      );
    }

    const ref = useComposedRefs(elementRef, outerRef);

    if (!isSorting) {
      cacheRef.current.set(id, children);
    }

    return (
      <Box
        data-sortable-dragging={isDragging ? "" : undefined}
        ref={ref}
        {...styles.item({ handle: !handleRef.current }, className)}
        {...props}
      >
        {cacheRef.current.get(id)}
      </Box>
    );
  },
);

SortableItem.displayName = "@optiaxiom/react/SortableItem";
