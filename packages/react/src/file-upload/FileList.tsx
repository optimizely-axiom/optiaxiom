import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { FileListItem } from "./FileListItem";

export type FileListProps = BoxProps<"div"> & {
  /**
   * The list of file objects to be previewed.
   */
  files: File[];
  /**
   * Callback function called when a file is removed
   */
  onRemove?: (index: number) => void;
};

export function FileList({ files, onRemove }: FileListProps) {
  return (
    <Flex gap="12">
      {files.map((file: File, idx: number) => (
        <FileListItem
          file={file}
          key={idx}
          onRemove={onRemove ? () => onRemove(files.indexOf(file)) : undefined}
        />
      ))}
    </Flex>
  );
}
