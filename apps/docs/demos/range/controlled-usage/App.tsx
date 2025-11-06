"use client";

import { Box, Button, Flex } from "@optiaxiom/react";
import { Range } from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [value, setValue] = useState(50);

  return (
    <Flex w="384">
      <Flex flexDirection="row">
        <Range onValueChange={setValue} value={value} />
        <Box asChild fontSize="md" w="56">
          <output>{value}</output>
        </Box>
      </Flex>

      <Button
        alignSelf="start"
        disabled={value === 50}
        onClick={() => setValue(50)}
      >
        Reset
      </Button>
    </Flex>
  );
}
