import { useFileUploadContext } from "./FileUploadContext";

export const useFileUploadTrigger = () => {
  const { openFileDialog } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadOpen",
  );

  return openFileDialog;
};
