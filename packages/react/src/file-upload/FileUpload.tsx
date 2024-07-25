import { forwardRef, useCallback } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { IconGallery } from "../icons/IconGallery";
import { extractSprinkles } from "../sprinkles";
import { Text } from "../text";
import * as styles from "./FileUpload.css";

type FileUploadProps = BoxProps<
  "div",
  {
    onFilesUploaded?: (acceptedFiles: File[]) => void;
  } & DropzoneOptions
>;

export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  ({ children, className, onFilesUploaded, ...props }, ref) => {
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        onFilesUploaded?.(acceptedFiles);
      },
      [onFilesUploaded],
    );

    const { restProps, sprinkleProps } = extractSprinkles(props);
    const { getInputProps, getRootProps, isDragActive } = useDropzone({
      onDrop,
      ...restProps,
    });

    return (
      <Box {...styles.wrapper({}, className)} ref={ref} {...sprinkleProps}>
        <Box {...styles.dropzone()} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <Flex flexDirection="row">
              <Box>
                <IconGallery />
              </Box>
              <Box>
                <Text fontSize="lg">
                  Drag images here or click to select files
                </Text>
                <Text fontSize="sm" fontWeight="200">
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </Box>
            </Flex>
          )}
          {children}
        </Box>
      </Box>
    );
  },
);

FileUpload.displayName = "@optiaxiom/react/FileUpload";
