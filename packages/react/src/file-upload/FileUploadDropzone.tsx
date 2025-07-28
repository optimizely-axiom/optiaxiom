import { useComposedRefs } from "@radix-ui/react-compose-refs";
import { forwardRef, useRef, useState } from "react";

import { type BoxProps } from "../box";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconFileImport } from "../icons/IconFileImport";
import { Text } from "../text";
import { VisuallyHidden } from "../visually-hidden";
import { useFileUploadContext } from "./FileUploadContext";
import * as styles from "./FileUploadDropzone.css";
import { FileUploadTrigger } from "./FileUploadTrigger";
import { useContainerSize } from "./useContainerSize";
import { useDraggingOverBody } from "./useDraggingOverBody";
import { useFileUploadDragging } from "./useFileUploadDragging";
import { useFileUploadDrop } from "./useFileUploadDrop";
import { useStickyPosition } from "./useStickyPosition";

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
     * container and only visible when user is dragging a file into the browser.
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
      label = "Drag and drop files here",
      overlay = false,
      ...props
    },
    outerRef,
  ) => {
    const { accept, inputRef, onFilesDrop } = useFileUploadContext(
      "@optiaxiom/react/FileUploadDropzone",
    );

    const [isDragging, setIsDragging] = useState(false);
    const isDraggingOverBody = useDraggingOverBody();

    const innerRef = useRef<HTMLDivElement>(null);
    useStickyPosition(innerRef, overlay && isDraggingOverBody);

    const size = useContainerSize(innerRef) ?? 0;

    return (
      <Flex
        ref={useComposedRefs(innerRef, outerRef)}
        {...styles.dropzone(
          {
            drag: isDragging,
            hidden: overlay && !isDraggingOverBody,
            overlay,
          },
          className,
        )}
        {...useFileUploadDrop(useFileUploadDragging(props, setIsDragging))}
      >
        <VisuallyHidden asChild>
          <input
            accept={accept}
            aria-description={description}
            aria-label={label}
            multiple
            onChange={(event) => {
              onFilesDrop?.([...(event.target.files || [])]);
              event.target.value = "";
            }}
            ref={inputRef}
            type="file"
          />
        </VisuallyHidden>
        <Flex alignItems="center" gap="8">
          <Icon asChild color="fg.secondary" h={size > 448 ? "lg" : "sm"}>
            <IconFileImport />
          </Icon>
          <Text>{label}</Text>
          {description && <Text color="fg.tertiary">{description}</Text>}
        </Flex>
        {!overlay && (children ?? <FileUploadTrigger />)}
      </Flex>
    );
  },
);

FileUploadDropzone.displayName = "@optiaxiom/react/FileUploadDropzone";
