import { Box, Flex } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const RadioGroupIcon = () => (
  <Flex gap="6" w="56">
    <Flex flexDirection="row" gap="4">
      <Box
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        p="4"
        rounded="full"
      />
      <IconText w="full" />
    </Flex>

    <Flex flexDirection="row" gap="4">
      <Box
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        p="2"
        rounded="full"
      >
        <IconText w="2/3" />
      </Box>
      <IconText w="1/2" />
    </Flex>

    <Flex flexDirection="row" gap="4">
      <Box
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        p="4"
        rounded="full"
      />
      <IconText w="2/3" />
    </Flex>
  </Flex>
);
