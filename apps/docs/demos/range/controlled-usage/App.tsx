"use client";

import { Box, Button, Group } from "@optiaxiom/react";
import { Range } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(50);

  return (
    <Group flexDirection="column" gap="16" w="384">
      <Group gap="16">
        <Range onValueChange={setValue} value={value} />
        <Box asChild fontSize="md" w="56">
          <output>{value}</output>
        </Box>
      </Group>
      <Button
        alignSelf="start"
        disabled={value === 50}
        onClick={() => setValue(50)}
      >
        Reset
      </Button>
    </Group>
  );
}
