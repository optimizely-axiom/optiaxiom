import { Box, Group } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const RadioGroupIcon = () => (
  <Group flexDirection="column" gap="6" w="56">
    <Group gap="4">
      <Box
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        p="4"
        rounded="full"
      />
      <IconText w="full" />
    </Group>

    <Group gap="4">
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
    </Group>

    <Group gap="4">
      <Box
        bg="bg.default"
        border="1"
        borderColor="border.accent"
        p="4"
        rounded="full"
      />
      <IconText w="2/3" />
    </Group>
  </Group>
);
