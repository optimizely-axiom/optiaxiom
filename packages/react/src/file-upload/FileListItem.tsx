import { Box, type BoxProps } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";

export type FileListItemProps = BoxProps<"div"> & {
  /**
   * The file object to be previewed in the list item.
   */
  file: File;
};

export function FileListItem({ file }: FileListItemProps) {
  return (
    <Flex flexDirection="row" gap="12">
      <Box overflow="hidden" rounded="sm" size="24">
        <Box asChild objectFit="cover">
          <img alt={file.name} src={URL.createObjectURL(file)} />
        </Box>
      </Box>
      <Text fontSize="sm" textAlign="start" truncate w="full">
        {file.name}
      </Text>
    </Flex>
  );
}
