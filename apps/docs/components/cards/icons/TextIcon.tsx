import { Group } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const TextIcon = () => (
  <Group flexDirection="column" gap="4" w="56">
    <IconText w="1/2" />
    <IconText intent="secondary" w="full" />
    <IconText intent="secondary" w="2/3" />
  </Group>
);
