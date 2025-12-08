"use client";

import { Group, Text } from "@optiaxiom/react";
import { Range } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Group flexDirection="column" gap="16">
      <Text>Generate labels dynamically</Text>
      <Range
        defaultValue={20}
        getLabel={(value) => `${value}%`}
        marks={[20, 50, 80]}
        w="384"
      />
      <Text>Specify labels for each mark</Text>
      <Range
        defaultValue={20}
        marks={[
          { label: "20%", value: 20 },
          { label: "50%", value: 50 },
          { label: "80%", value: 80 },
        ]}
        w="384"
      />
    </Group>
  );
}
