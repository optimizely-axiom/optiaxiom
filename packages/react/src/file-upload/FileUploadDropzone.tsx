import { Box } from "../box";
import { Flex } from "../flex";
import { IconDragAndDrop } from "../icons/IconDragAndDrop";
import { Input } from "../input";
import { Text } from "../text";
import { VisuallyHidden } from "../visually-hidden";
import * as styles from "./FileUpload.css";
import { useFileUploadContext } from "./FileUploadContext";

export const FileUploadDropzone: React.FC = () => {
  const { getInputProps, getRootProps } = useFileUploadContext("@optiaxiom/react/FileUploadDropzone");

  const inputProps = getInputProps();
  const { color: _color, size: _size, ...filteredProps } = inputProps;

  return (
    <Box {...getRootProps()}>
      <Flex {...styles.fileUpload({})}>
        <VisuallyHidden>
          <Input {...filteredProps} />
        </VisuallyHidden>
        <IconDragAndDrop/>
        <Text>Drag and drop or click to upload</Text>
      </Flex>
    </Box>
  );
};

FileUploadDropzone.displayName = '@optiaxiom/react/FileUploadDropzone';