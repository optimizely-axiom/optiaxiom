import { useFileUploadContext } from "./FileUploadContext";

export const useFileUploadTrigger = () => {
  const { dropzone } = useFileUploadContext(
    "@optiaxiom/react/useFileUploadOpen",
  );

  return dropzone.open;
};
