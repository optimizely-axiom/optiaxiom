import { forwardRef } from "react";

import type { BoxProps } from "../box";

import { Flex } from "../flex";
import {
  FileUploadListItem,
  type FileUploadListItemProps,
} from "./FileUploadListItem";

export type FileUploadListProps = BoxProps<"div"> & {
  /**
   * The list of file items to be previewed.
   */
  items: FileUploadListItemProps["item"][];
  /**
   * Callback function called when a file is removed
   */
  onRemove?: (index: FileUploadListItemProps["item"]) => void;
};

export const FileUploadList = forwardRef<HTMLDivElement, FileUploadListProps>(
  ({ items, onRemove, ...props }, ref) => {
    return (
      <Flex gap="12" ref={ref} {...props}>
        {items.map((item, idx) => (
          <FileUploadListItem
            item={item}
            key={idx}
            onRemove={onRemove ? () => onRemove(item) : undefined}
          />
        ))}
      </Flex>
    );
  },
);

FileUploadList.displayName = "@optiaxiom/react/FileUploadList";
