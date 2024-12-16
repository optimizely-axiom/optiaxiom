import { theme } from "@optiaxiom/globals";
import { Box, Flex } from "@optiaxiom/react";

import { IconBox } from "./IconBox";
import { IconText } from "./IconText";

export const BannerIcon = () => (
  <IconBox
    alignItems="start"
    bg="bg.error.light"
    display="flex"
    flexDirection="row"
    gap="4"
    w="56"
  >
    <Box
      p="2"
      rounded="sm"
      style={{ backgroundColor: theme.colors["fg.error.strong"] }}
    />
    <Flex flex="1" gap="4">
      <IconText w="1/4" />
      <IconText style={{ opacity: 0.5 }} w="2/3" />
    </Flex>
    <IconText ml="auto" />
  </IconBox>
);
