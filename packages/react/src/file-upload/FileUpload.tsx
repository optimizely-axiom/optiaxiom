import { forwardRef, useState } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Box, type BoxProps } from "../box";
import { FileList } from "./FileList";
import { FileUploadProvider } from "./FileUploadContext";

export type FileUploadProps = BoxProps<
  "div",
  {
    /**
     * File types to accept for upload. An object with the keys set to the MIME
     * type and the values an array of file extensions.
     *
     * @example
     * {
     *   "image/*": [],
     * }
     */
    accept?: DropzoneOptions["accept"];
    /**
     * Callback function called when files are dropped or selected
     */
    onFilesDrop?: (files: File[]) => void;
  }
>;

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ accept, children, onFilesDrop, ...props }, ref) => {
    const [files, setFiles] = useState<File[]>([]);
    // const [view, setView] = useState<"grid" | "list">(viewProp || "grid");
    const {
      getInputProps,
      getRootProps,
      isDragAccept,
      isDragActive,
      isDragReject,
    } = useDropzone({
      accept,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length) {
          setFiles((prev) => [...prev, ...acceptedFiles]);
          onFilesDrop?.(acceptedFiles);
        }
      },
    });

    return (
      <FileUploadProvider
        files={files}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        isDragAccept={isDragActive && isDragAccept}
        isDragReject={isDragActive && isDragReject}
        setFiles={setFiles}
      >
        <Box color="fg.default" ref={ref} {...props}>
          {files.length > 0 ? <FileList files={files} /> : children}
        </Box>
      </FileUploadProvider>
    );
  },
);

FileUpload.displayName = "@optiaxiom/react/FileUpload";
