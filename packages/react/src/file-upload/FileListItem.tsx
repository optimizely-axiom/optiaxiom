import { Box, type BoxProps } from "../box";
import { Button } from "../button";
import { Flex } from "../flex";
import { IconTrash } from "../icons/IconTrash";
import { Text } from "../text";

export type FileListItemProps = BoxProps<"div"> & {
  /**
   * The file object to be previewed in the list item.
   */
  file: File;
  /**
   * Callback function called when the remove button is clicked
   */
  onRemove?: () => void;
};

export function FileListItem({ file, onRemove }: FileListItemProps) {
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
      {onRemove && (
        <Button
          appearance="subtle"
          aria-label="Remove file"
          icon={<IconTrash />}
          onClick={onRemove}
          size="md"
        />
      )}
    </Flex>
  );
}
