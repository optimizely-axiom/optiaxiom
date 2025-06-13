import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./SortableHandle.css";
import { useSortableItemContext } from "./SortableItemContext";

export type SortableHandleProps = BoxProps;

export const SortableHandle = forwardRef<HTMLDivElement, SortableHandleProps>(
  ({ children, className, ...props }, outerRef) => {
    const { handleRef, isDragging } = useSortableItemContext(
      "@optiaxiom/react/SortableHandle",
    );
    const ref = useComposedRefs(handleRef, outerRef);

    return (
      <Box
        aria-label="draggable"
        data-state={isDragging ? "active" : undefined}
        ref={ref}
        {...styles.handle({}, className)}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

SortableHandle.displayName = "@optiaxiom/react/SortableHandle";
