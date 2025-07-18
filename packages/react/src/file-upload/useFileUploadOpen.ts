import { useFileUploadContext } from "./FileUploadContext";

export const useFileUploadOpen = () => {
  const { openFileDialog } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadOpen",
  );

  return openFileDialog;
};
