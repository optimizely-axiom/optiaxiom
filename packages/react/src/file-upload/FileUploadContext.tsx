import { createContext, useContext } from "react";
import { type DropzoneInputProps, type DropzoneRootProps } from "react-dropzone";

interface FileUploadContextProps {
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  isDragActive: boolean;
}

export const FileUploadContext = createContext<FileUploadContextProps | undefined>(undefined);

export const useFileUploadContext = () => {
  const ctx = useContext(FileUploadContext);
  if (!ctx) throw new Error("useFileUploadContext must be used within FileUpload");
  return ctx;
}; 