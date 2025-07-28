import { useEffect, useRef, useState } from "react";

import { useFileUploadContext } from "./FileUploadContext";

export const useDraggingOverBody = () => {
  const { disabled } = useFileUploadContext(
    "@optiaxiom/react/FileUploadDropzone",
  );
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<number>();

  useEffect(() => {
    if (disabled) {
      return;
    }

    const over = () => {
      setIsDragging(true);
      window.clearTimeout(dropRef.current);
      dropRef.current = window.setTimeout(() => {
        setIsDragging(false);
      }, 100);
    };

    document.body.addEventListener("dragover", over);
    return () => {
      document.body.removeEventListener("dragover", over);
    };
  }, [disabled]);

  return isDragging;
};
