import { Group } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const SearchInputIcon = () => (
  <Group
    bg="bg.default"
    border="1"
    borderColor="border.accent"
    gap="4"
    p="6"
    rounded="sm"
    w="56"
  >
    <IconText intent="secondary" />
    <IconText intent="secondary" w="1/3" />
    <IconText intent="secondary" ml="auto" />
  </Group>
);
