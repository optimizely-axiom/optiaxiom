import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";
import { useFileUploadContext } from "./FileUploadContext";

export type FileListItemProps = BoxProps<
  "div",
  {
    /**
     * The file object to be previewed in the list item.
     */
    file: File;
  }
>;

export function FileListItem({ file }: FileListItemProps) {
  const { view } = useFileUploadContext(
    "@optiaxiom/react/FileUploadPreviewList",
  );
  return (
    <Flex
      alignItems="center"
      flexDirection={view === "list" ? "row" : "column"}
      gap={view === "list" ? "12" : "8"}
      textAlign="center"
      w={view === "grid" ? "40" : "full"}
    >
      <Box asChild rounded="lg" w={view === "list" ? "24" : "40"}>
        <img alt={file.name} src={URL.createObjectURL(file)} />
      </Box>
      <Text fontSize="sm" textAlign="start" truncate w="full">
        {file.name}
      </Text>
    </Flex>
  );
}
