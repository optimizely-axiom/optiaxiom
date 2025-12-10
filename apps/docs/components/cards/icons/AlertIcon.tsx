import { Box, type BoxProps, Group, theme } from "@optiaxiom/react";

import { IconBox } from "./IconBox";
import { IconText } from "./IconText";

export const AlertIcon = (props: BoxProps) => (
  <IconBox
    alignItems="start"
    bg="bg.warning.subtle"
    display="flex"
    flexDirection="row"
    gap="4"
    w="56"
    {...props}
  >
    <Box
      p="2"
      rounded="sm"
      style={{ backgroundColor: theme.colors["fg.warning.strong"] }}
    />
    <Group flex="1" flexDirection="column" gap="4">
      <IconText w="1/4" />
      <IconText intent="secondary" w="2/3" />
      <IconText intent="secondary" w="1/2" />
    </Group>
  </IconBox>
);
