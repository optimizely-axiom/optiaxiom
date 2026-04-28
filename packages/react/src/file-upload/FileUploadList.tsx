import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { FileUploadListItem } from "./FileUploadListItem";

export type FileUploadListProps = BoxProps<"div"> & {
  /**
   * The list of file objects to be previewed.
   */
  files: File[];
  /**
   * Callback function called when a file is removed
   */
  onRemove?: (index: number) => void;
};

export const FileUploadList = forwardRef<HTMLDivElement, FileUploadListProps>(
  ({ files, onRemove, ...props }) => {
    return (
      <Flex gap="12" {...props}>
        {files.map((file: File, idx: number) => (
          <FileUploadListItem
            file={file}
            key={idx}
            onRemove={
              onRemove ? () => onRemove(files.indexOf(file)) : undefined
            }
          />
        ))}
      </Flex>
    );
  },
);

FileUploadList.displayName = "@optiaxiom/react/FileUploadList";
