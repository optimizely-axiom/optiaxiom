import { useEffect, useRef, useState } from "react";

import { useFileUploadContext } from "./FileUploadContext";

export const useDraggingOverBody = () => {
  const { disabled, rootRef } = useFileUploadContext(
    "@optiaxiom/react/FileUploadDropzone",
  );
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef({
    source: null as "file" | Node | null,
    timer: 0,
  });

  useEffect(() => {
    if (disabled) {
      return;
    }

    const over = (event: DragEvent) => {
      if (!dragRef.current.source) {
        dragRef.current.source = event.dataTransfer?.items
          ? Array.from(event.dataTransfer.items).some(
              (item) => item.kind === "file",
            )
            ? "file"
            : Array.from(event.dataTransfer.items).some(
                  (item) =>
                    item.type === "opal-chat-dnd-data" ||
                    item.type === "opal-host-dnd-data",
                )
              ? event.target instanceof Node
                ? event.target
                : null
              : null
          : "file";
      }
      setIsDragging(
        dragRef.current.source !== null &&
          (dragRef.current.source === "file" ||
            !rootRef.current?.contains(dragRef.current.source)),
      );

      window.clearTimeout(dragRef.current.timer);
      dragRef.current.timer = window.setTimeout(() => {
        dragRef.current.source = null;
        setIsDragging(false);
      }, 100);
    };

    document.body.addEventListener("dragover", over);
    return () => {
      document.body.removeEventListener("dragover", over);
    };
  }, [disabled, rootRef]);

  return isDragging;
};
