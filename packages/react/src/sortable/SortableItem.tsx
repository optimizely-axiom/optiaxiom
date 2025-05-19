import type { UniqueIdentifier } from "@dnd-kit/abstract";

import { useSortable } from "@dnd-kit/react/sortable";
import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./SortableItem.css";
import { SortableItemProvider } from "./SortableItemContext";

export type SortableItemProps = BoxProps<
  "div",
  {
    group?: string;
    index: number;
    item: Record<string, unknown> & {
      id: UniqueIdentifier;
    };
  }
>;

export const SortableItem = forwardRef<HTMLDivElement, SortableItemProps>(
  ({ children, className, group, index, item, style, ...props }, outerRef) => {
    const {
      handleRef,
      isDragging,
      ref: innerRef,
      sourceRef: sourceOuterRef,
    } = useSortable({
      accept: "item",
      data: item,
      group,
      id: item.id,
      index,
      type: "item",
    });
    const ref = useComposedRefs(innerRef, outerRef);
    const sourceInnerRef = useRef<HTMLDivElement>(null);
    const sourceRef = useComposedRefs(sourceInnerRef, sourceOuterRef);

    return (
      <SortableItemProvider
        handleRef={handleRef}
        id={item.id}
        isDragging={isDragging}
        sourceRef={sourceRef}
      >
        <Box
          ref={ref}
          style={{
            opacity: !sourceInnerRef.current && isDragging ? 0.5 : undefined,
            ...style,
          }}
          {...styles.item({ handle: !sourceInnerRef.current }, className)}
          {...props}
        >
          {children}
        </Box>
      </SortableItemProvider>
    );
  },
);

SortableItem.displayName = "@optiaxiom/react/SortableItem";
