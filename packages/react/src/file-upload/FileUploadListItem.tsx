import { forwardRef } from "react";

import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Cover } from "../cover";
import { Flex } from "../flex";
import { Icon } from "../icon";
import { IconFileSolid } from "../icons/IconFileSolid";
import { IconTrashCan } from "../icons/IconTrashCan";
import { Text } from "../text";
import * as styles from "./FileUploadListItem.css";

export type FileUploadListItemProps = BoxProps<"div"> & {
  /**
   * The file object to be previewed in the list item.
   */
  file: File;
  /**
   * Callback function called when the remove button is clicked
   */
  onRemove?: () => void;
};

function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  a.click();
  URL.revokeObjectURL(url);
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const mimeTypeLabels: Array<[RegExp, string]> = [
  [/^application\/pdf$/, "PDF"],
  [/^image\//, "Image"],
  [/^video\//, "Video"],
  [/^audio\//, "Audio"],
  [/csv/, "CSV"],
  [/spreadsheet|excel/, "Excel"],
  [/presentation|powerpoint/, "PowerPoint"],
  [/document|msword|wordprocessing/, "Word"],
  [/zip|compressed|archive/, "Archive"],
  [/^text\//, "Text"],
];

function formatFileType(file: File) {
  if (file.type) {
    for (const [pattern, label] of mimeTypeLabels) {
      if (pattern.test(file.type)) {
        return label;
      }
    }
  }
  return "File";
}

export const FileUploadListItem = forwardRef<
  HTMLDivElement,
  FileUploadListItemProps
>(({ className, file, onRemove, ...props }, ref) => {
  return (
    <Flex ref={ref} {...styles.item({}, className)} {...props}>
      {file.type.startsWith("image/") ? (
        <Box overflow="hidden" rounded="sm" size="24">
          <Box asChild h="full" objectFit="cover" w="full">
            <img alt={file.name} src={URL.createObjectURL(file)} />
          </Box>
        </Box>
      ) : (
        <Icon asChild color="fg.tertiary" h="auto" w="24">
          <IconFileSolid />
        </Icon>
      )}
      <Flex flex="1" gap="2" overflow="hidden">
        <Cover asChild>
          <Text asChild lineClamp="2" {...styles.name()}>
            <button onClick={() => downloadFile(file)} type="button">
              {file.name}
            </button>
          </Text>
        </Cover>
        <Text color="fg.tertiary" fontSize="sm" textAlign="start">
          {formatFileType(file)} • {formatFileSize(file.size)}
        </Text>
      </Flex>
      {onRemove && (
        <Button
          appearance="subtle"
          aria-label="Remove file"
          icon={<IconTrashCan />}
          onClick={onRemove}
        />
      )}
    </Flex>
  );
});

FileUploadListItem.displayName = "@optiaxiom/react/FileUploadListItem";
