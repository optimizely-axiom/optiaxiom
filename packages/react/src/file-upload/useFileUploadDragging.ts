import { useRef } from "react";

import type { BoxProps } from "../box";

import { useFileUploadContext } from "./FileUploadContext";

export const useFileUploadDragging = (
  { onDragEnter, onDragLeave, onDrop, ...props }: BoxProps = {},
  onDraggingChange: (dragging: boolean) => void,
): BoxProps => {
  const { disabled } = useFileUploadContext(
    "@optiaxiom/react/FileUploadDropzone",
  );
  const targetsRef = useRef<EventTarget[]>([]);

  return {
    ...props,
    onDragEnter: (event) => {
      onDragEnter?.(event);
      if (disabled) {
        return;
      }

      targetsRef.current = [...targetsRef.current, event.target];
      onDraggingChange(true);
    },
    onDragLeave: (event) => {
      onDragLeave?.(event);
      if (disabled) {
        return;
      }

      targetsRef.current = targetsRef.current.filter(
        (element) => element !== event.target,
      );
      if (targetsRef.current.length === 0) {
        onDraggingChange(false);
      }
    },
    onDrop: (event) => {
      onDrop?.(event);
      if (disabled) {
        return;
      }

      targetsRef.current = [];
      onDraggingChange(false);
    },
  };
};
