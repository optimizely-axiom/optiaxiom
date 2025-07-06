import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import * as styles from "./FileListItem.css";
import { useFileUploadContext } from "./FileUploadContext";

export type FileListItemProps = BoxProps<"div", styles.FileListItemVariants> & {
  /**
   * The file object to be previewed in the list item.
   */
  file: File;
};

export function FileListItem({ file }: FileListItemProps) {
  const { view } = useFileUploadContext(
    "@optiaxiom/react/FileUploadPreviewList",
  );
  return (
    <Flex {...styles.item({ view })}>
      <Box asChild {...styles.image({ view })}>
        <img alt={file.name} src={URL.createObjectURL(file)} />
      </Box>
      <Text fontSize="sm" textAlign="start" truncate w="full">
        {file.name}
      </Text>
    </Flex>
  );
}
