import { useRef } from "react";

import type { BoxProps } from "../box";

export const useFileUploadDragging = (
  { onDragEnter, onDragLeave, onDrop, ...props }: BoxProps = {},
  onDraggingChange: (dragging: boolean) => void,
): BoxProps => {
  const targetsRef = useRef<EventTarget[]>([]);

  return {
    ...props,
    onDragEnter: (event) => {
      onDragEnter?.(event);

      targetsRef.current = [...targetsRef.current, event.target];
      onDraggingChange(true);
    },
    onDragLeave: (event) => {
      onDragLeave?.(event);

      targetsRef.current = targetsRef.current.filter(
        (element) => element !== event.target,
      );
      if (targetsRef.current.length === 0) {
        onDraggingChange(false);
      }
    },
    onDrop: (event) => {
      onDrop?.(event);

      targetsRef.current = [];
      onDraggingChange(false);
    },
  };
};
