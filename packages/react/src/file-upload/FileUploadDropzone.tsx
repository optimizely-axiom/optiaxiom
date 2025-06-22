import { Box } from "../box";
import { Flex } from "../flex";
import { IconDragAndDrop } from "../icons/IconDragAndDrop";
import { Text } from "../text";
import * as styles from "./FileUpload.css";
import { useFileUploadContext } from "./FileUploadContext";

export const FileUploadDropzone: React.FC = () => {
  const { getInputProps, getRootProps } = useFileUploadContext();

  return (
    <Box {...getRootProps()}>
      <Flex {...styles.fileUpload({})}>
        <input type="file" {...(getInputProps() as React.InputHTMLAttributes<HTMLInputElement>)} />
        <IconDragAndDrop/>
        <Text>Drag and drop or click to upload</Text>
      </Flex>
    </Box>
  );
};

FileUploadDropzone.displayName = '@optiaxiom/react/FileUploadDropzone';