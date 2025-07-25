import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Box, type BoxProps } from "../box";
import * as styles from "./FileUpload.css";
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
  ({ accept, children, className, onFilesDrop, ...props }, outerRef) => {
    const dropzone = useDropzone({
      accept,
      noClick: true,
      noKeyboard: true,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length) {
          onFilesDrop?.(acceptedFiles);
        }
      },
    });
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    return (
      <FileUploadProvider dropzone={dropzone} rootRef={innerRef}>
        <Box ref={ref} {...styles.upload({}, className)} {...props}>
          {children}
        </Box>
      </FileUploadProvider>
    );
  },
);

FileUpload.displayName = "@optiaxiom/react/FileUpload";
