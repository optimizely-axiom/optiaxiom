"use client";

import { Button, Group, Text, Tooltip } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <Group flexDirection="column" gap="12">
      <Tooltip
        content="This is a controlled tooltip"
        onOpenChange={setOpen}
        open={open}
      >
        <Button>Hover me</Button>
      </Tooltip>
      <Text>Open: {open ? "true" : "false"}</Text>
    </Group>
  );
}
