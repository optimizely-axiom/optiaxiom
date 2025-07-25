import { forwardRef } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconFileImportSolid } from "../icons/IconFileImportSolid";
import { Text } from "../text";
import { useFileUploadContext } from "./FileUploadContext";
import * as styles from "./FileUploadDropzone.css";
import { FileUploadTrigger } from "./FileUploadTrigger";
import { useDraggingOverBody } from "./useDraggingOverBody";

export type FileUploadDropzoneProps = BoxProps<
  "div",
  {
    /**
     * Add secondary text after the primary label.
     */
    description?: string;
    /**
     * The label of the dropzone.
     */
    label?: string;
    /**
     * Whether to place the dropzone as an overlay fully covering the parent
     * container and only showing when user is dragging a file into the browser.
     */
    overlay?: boolean;
  }
>;

export const FileUploadDropzone = forwardRef<
  HTMLDivElement,
  FileUploadDropzoneProps
>(
  (
    {
      children,
      className,
      description,
      label = "Drop your files here",
      overlay,
      ...props
    },
    ref,
  ) => {
    const { dropzone } = useFileUploadContext(
      "@optiaxiom/react/FileUploadDropzone",
    );

    const isDraggingOverBody = useDraggingOverBody();

    return (
      <Flex
        {...dropzone.getRootProps({
          ...styles.dropzone(
            {
              drag: dropzone.isDragActive,
              hidden: overlay && !isDraggingOverBody,
              overlay,
            },
            className,
          ),
          ref: useComposedRefs(dropzone.rootRef, outerRef),
          ...props,
        })}
      >
        <input
          {...dropzone.getInputProps({
            "aria-description": description,
            "aria-label": label,
          })}
        />
        <Flex alignItems="center" gap="8">
          <Icon asChild color="fg.secondary">
            <IconFileImportSolid />
          </Icon>
          <Text>{label}</Text>
          {description && (
            <Text color="fg.tertiary" fontSize="sm">
              {description}
            </Text>
          )}
        </Flex>
        {!overlay && (children ?? <FileUploadTrigger />)}
      </Flex>
    );
  },
);

FileUploadDropzone.displayName = "@optiaxiom/react/FileUploadDropzone";
