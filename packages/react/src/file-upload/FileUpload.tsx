import { createContext, forwardRef, useContext } from "react";
import { type DropzoneOptions, type FileRejection, useDropzone } from "react-dropzone";

import { FileUploadDropzone } from "./FileUploadDropzone";

interface FileUploadContextProps {
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"];
  getRootProps: ReturnType<typeof useDropzone>["getRootProps"];
  isDragActive: boolean;
}

export const FileUploadContext = createContext<FileUploadContextProps | undefined>(undefined);

export type FileUploadProps = {
  /**
   * File types to accept for upload
   */
  accept?: DropzoneOptions["accept"];
  /**
   * Callback function called when files are dropped or selected
   */
  onFilesDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
};

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, onFilesDrop }, ref) => {
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
      accept,
      onDrop: (acceptedFiles, fileRejections) => {
        onFilesDrop?.(acceptedFiles, fileRejections);
      },
    });

    return (
      <FileUploadContext.Provider value={{ getInputProps, getRootProps, isDragActive }}>
        <div ref={ref}>
          <FileUploadDropzone />
        </div>
      </FileUploadContext.Provider>
    );
  },
);

FileUpload.displayName = "@optiaxiom/react/FileUpload";

export const useFileUploadContext = () => {
  const ctx = useContext(FileUploadContext);
  if (!ctx) throw new Error("useFileUploadContext must be used within FileUpload");
  return ctx;
}; 