import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { useSortableItemContext } from "./SortableItemContext";

export type SortableElementProps = BoxProps;

export const SortableElement = forwardRef<HTMLDivElement, SortableElementProps>(
  ({ children, style, ...props }, outerRef) => {
    const { isDragging, sourceRef } = useSortableItemContext(
      "@optiaxiom/react/SortableElement",
    );
    const ref = useComposedRefs(sourceRef, outerRef);

    return (
      <Box
        ref={ref}
        style={{
          opacity: isDragging ? 0.5 : undefined,
          ...style,
        }}
        transition="opacity"
        {...props}
      >
        {children}
      </Box>
    );
  },
);

SortableElement.displayName = "@optiaxiom/react/SortableElement";
