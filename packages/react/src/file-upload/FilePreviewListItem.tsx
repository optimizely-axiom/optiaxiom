import { Box } from "../box";
import { Flex } from "../flex";
import { Text } from "../text";

export interface FilePreviewListItemProps {
  file: File;
}

export function FilePreviewListItem({ file }: FilePreviewListItemProps) {
  return (
    <Flex alignItems="center" gap="8" w="40">
      <Box asChild rounded="lg" size="full">
        <img alt={file.name} src={URL.createObjectURL(file)} />
      </Box>
      <Text fontSize="sm" truncate w="full">
        {file.name}
      </Text>
    </Flex>
  );
}
