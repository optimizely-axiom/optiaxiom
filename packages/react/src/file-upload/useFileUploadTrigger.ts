import { useCallback } from "react";

import { useFileUploadContext } from "./FileUploadContext";

export const useFileUploadTrigger = () => {
  const { inputRef } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadOpen",
  );

  return useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);
};
