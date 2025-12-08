import type { ComponentPropsWithoutRef } from "react";

import { Box, Group } from "@optiaxiom/react";

import { IconButton } from "./IconButton";
import { IconText } from "./IconText";

export const DialogIcon = (props: ComponentPropsWithoutRef<typeof Group>) => (
  <Group
    bg="bg.default"
    border="1"
    borderColor="border.secondary"
    flexDirection="column"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
    {...props}
  >
    <IconText w="1/2" />
    <IconText intent="secondary" w="full" />
    <IconText intent="secondary" w="2/3" />
    <Box p="2" />
    <IconButton ml="auto" />
  </Group>
);
