import type { BoxProps } from "../box";

import { Flex } from "../flex";
import { FileListItem } from "./FileListItem";
import { useFileUploadContext } from "./FileUploadContext";
import { FileUploadDropzone } from "./FileUploadDropzone";

export type FileListProps = BoxProps<
  "div",
  {
    /**
     * The list of file objects to be previewed.
     */
    files: File[];
  }
>;

export function FileList({ files }: FileListProps) {
  const { view } = useFileUploadContext(
    "@optiaxiom/react/FileUploadPreviewList",
  );

  return (
    <Flex
      flexDirection={view === "list" ? "column" : "row"}
      gap={view === "list" ? "20" : "8"}
    >
      <FileUploadDropzone py="4" />
      {files.map((file, idx) => (
        <FileListItem file={file} key={idx} />
      ))}
    </Flex>
  );
}
