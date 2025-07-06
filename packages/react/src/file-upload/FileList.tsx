import type { BoxProps } from "../box";

import { Flex } from "../flex";
import * as styles from "./FileList.css";
import { FileListItem } from "./FileListItem";
import { useFileUploadContext } from "./FileUploadContext";
import { FileUploadDropzone } from "./FileUploadDropzone";
import { FileUploadDropzoneButton } from "./FileUploadDropzoneButton";

export type FileListProps = BoxProps<"div", styles.FileListVariants> & {
  /**
   * The list of file objects to be previewed.
   */
  files: File[];
};

export function FileList({ files }: FileListProps) {
  const { view } = useFileUploadContext(
    "@optiaxiom/react/FileUploadPreviewList",
  );

  return (
    <Flex {...styles.root({ view })}>
      {view === "grid" ? (
        <FileUploadDropzoneButton py="16" />
      ) : (
        <FileUploadDropzone py="16" />
      )}
      {files.map((file: File, idx: number) => (
        <FileListItem file={file} key={idx} />
      ))}
    </Flex>
  );
}
