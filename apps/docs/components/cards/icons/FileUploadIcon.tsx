import { Box } from "@optiaxiom/react";
import { IconDragDrop } from "@tabler/icons-react";

import { IconBox } from "./IconBox";

export const FileUploadIcon = () => (
  <Box border="2" p="8" rounded="sm" style={{ borderStyle: "dashed" }} w="56">
    <IconBox color="fg.tertiary" flex="1" size="sm">
      <IconDragDrop />
    </IconBox>
  </Box>
);
