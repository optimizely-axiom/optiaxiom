import { Flex } from "@optiaxiom/react";

import { IconBox } from "./IconBox";

export const FlexIcon = () => (
  <Flex flexDirection="row" gap="4" justifyContent="stretch" w="56">
    <IconBox bg="bg.accent.light" flex="1" />

    <IconBox bg="bg.success.light" flex="none" p="10" />
  </Flex>
);
