import { Flex } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const InputIcon = () => (
  <Flex
    bg="bg.default"
    border="1"
    borderColor="border.accent"
    flexDirection="row"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
  >
    <IconText intent="secondary" w="2/3" />
  </Flex>
);
