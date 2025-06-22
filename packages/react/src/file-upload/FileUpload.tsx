import { forwardRef } from "react";
import { type DropzoneOptions, type FileRejection, useDropzone } from "react-dropzone";

import { FileUploadContext } from "./FileUploadContext";
import { FileUploadDropzone } from "./FileUploadDropzone";

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