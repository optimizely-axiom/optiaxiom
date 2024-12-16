import { Flex } from "@optiaxiom/react";

import { IconBox } from "./IconBox";
import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const DropdownMenuIcon = () => (
  <Flex alignItems="start" gap="2">
    <IconButton pl="20" pr="4">
      <IconText intent="secondary" p="2" rounded="sm" />
    </IconButton>
    <IconBox
      bg="bg.default"
      display="flex"
      flexDirection="column"
      gap="4"
      shadow="sm"
      w="lg"
    >
      <IconText intent="secondary" w="2/3" />
      <IconText intent="secondary" w="full" />
      <IconText intent="secondary" p="0" style={{ paddingTop: "1px" }} />
      <IconText intent="danger" w="1/2" />
    </IconBox>
  </Flex>
);
