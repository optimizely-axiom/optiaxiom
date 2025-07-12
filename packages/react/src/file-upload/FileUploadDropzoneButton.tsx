import { useId } from "@radix-ui/react-id";
import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Icon } from "../icon";
import { IconPlus } from "../icons/IconPlus";
import { useFileUploadContext } from "./FileUploadContext";
import * as styles from "./FileUploadDropzone.css";

export type FileUploadDropzoneButtonProps = BoxProps;

export const FileUploadDropzoneButton = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneButtonProps
>(({ className, ...props }, ref) => {
  const { getInputProps, getRootProps, isDragAccept, isDragReject } =
    useFileUploadContext("@optiaxiom/react/FileUploadDropzoneButton");
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
        <IconPlus />
      </Icon>
    </Box>
  );
});

FileUploadDropzoneButton.displayName =
  "@optiaxiom/react/FileUploadDropzoneButton";
