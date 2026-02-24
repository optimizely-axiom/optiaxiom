import { Group, Radio } from "@optiaxiom/react";

import { IconText } from "./IconText";

export const RadioGroupIcon = () => (
  <Group flexDirection="column" gap="6" w="56">
    <Group gap="4" pointerEvents="none">
      <Radio checked={false} style={{ margin: -6, scale: 0.5 }} />
      <IconText w="full" />
    </Group>

    <Group gap="4" pointerEvents="none">
      <Radio checked style={{ margin: -6, scale: 0.5 }} />
      <IconText w="1/2" />
    </Group>

    <Group gap="4" pointerEvents="none">
      <Radio checked={false} style={{ margin: -6, scale: 0.5 }} />
      <IconText w="2/3" />
    </Group>
  </Group>
);
