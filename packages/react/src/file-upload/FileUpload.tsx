import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef } from "react";

import { Box, type BoxProps } from "../box";
import * as styles from "./FileUpload.css";
import { FileUploadProvider } from "./FileUploadContext";

export type FileUploadProps = BoxProps<
  "div",
  {
    /**
     * File types to accept for upload. An array of strings of the MIME type
     * and/or file extensions to accept.
     *
     * @example
     * ["image/*"]
     * [".png", ".jpg"]
     */
    accept?: string[];
    /**
     * Whether the file uploader is disabled.
     */
    disabled?: boolean;
    /**
     * Callback function called when files are dropped or selected
     */
    onFilesDrop?: (files: File[]) => void;
  }
>;

/**
 * Capture file input from users with drag and drop.
 *
 * @category form
 * @since 1.6.0
 * @experimental
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    { accept, children, className, disabled, onFilesDrop, ...props },
    outerRef,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const ref = useComposedRefs(innerRef, outerRef);

    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <FileUploadProvider
        accept={(accept ?? []).join(",")}
        disabled={disabled}
        inputRef={inputRef}
        onFilesDrop={onFilesDrop}
        rootRef={innerRef}
      >
        <Box ref={ref} {...styles.upload({}, className)} {...props}>
          {children}
        </Box>
      </FileUploadProvider>
    );
  },
);

FileUpload.displayName = "@optiaxiom/react/FileUpload";
