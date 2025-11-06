import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { FileListItem } from "./FileListItem";

export type FileListProps = BoxProps<"div"> & {
  /**
   * The list of file objects to be previewed.
   */
  files: File[];
};

export function FileList({ files }: FileListProps) {
  return (
    <Flex gap="12">
      {files.map((file: File, idx: number) => (
        <FileListItem file={file} key={idx} />
      ))}
    </Flex>
  );
}
