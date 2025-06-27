import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Icon } from "../icon";
import { IconFileImportSolid } from "../icons/IconFileImportSolid";
import { Text } from "../text";
import { useFileUploadContext } from "./FileUploadContext";
import * as styles from "./FileUploadDropzone.css";

export type FileUploadDropzoneProps = BoxProps;

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(({ children, className, ...props }, ref) => {
  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useFileUploadContext("@optiaxiom/react/FileUploadDropzone");
  const id = useId();

  return (
    <Box
      ref={ref}
      {...getRootProps({
        ...styles.dropzone(
          {
            drag: isDragAccept ? "accept" : isDragReject ? "reject" : "default",
          },
          className,
        ),
        ...props,
      })}
    >
      <input aria-labelledby={id} {...getInputProps()} />
      <Icon asChild color="fg.secondary">
        <IconFileImportSolid />
      </Icon>
      <Text aria-hidden id={id}>
        Drag and drop or click to upload
      </Text>
      {children}
    </Box>
  );
});

FileUploadDropzone.displayName = "@optiaxiom/react/FileUploadDropzone";
