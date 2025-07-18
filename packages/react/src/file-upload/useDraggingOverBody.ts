import { useEffect, useRef, useState } from "react";

export const useDraggingOverBody = () => {
  const [isDragging, setIsDragging] = useState(false);
  const dropRef = useRef<number>();

  useEffect(() => {
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
  }, []);

  return isDragging;
};
