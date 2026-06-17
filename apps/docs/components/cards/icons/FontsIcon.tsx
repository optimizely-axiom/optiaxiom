import { Group, Text } from "@optiaxiom/react";

export const FontsIcon = () => (
  <Group
    flexDirection="row"
    fontFamily="heading"
    style={{ alignItems: "baseline" }}
  >
    <Text
      color="fg.secondary"
      fontWeight="600"
      style={{
        fontSize: "40px",
        lineHeight: 1,
      }}
    >
      A
    </Text>
    <Text
      color="fg.tertiary"
      style={{
        fontSize: "36px",
        lineHeight: 1,
      }}
    >
      a
    </Text>
  </Group>
);
