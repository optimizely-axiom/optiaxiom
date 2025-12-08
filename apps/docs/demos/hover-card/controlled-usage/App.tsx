"use client";

import { Group, Text } from "@optiaxiom/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@optiaxiom/react/unstable";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);

  return (
    <Group gap="16" w="224">
      <HoverCard onOpenChange={setOpen} open={open}>
        <HoverCardTrigger
          bg="bg.secondary"
          color="fg.default"
          cursor="pointer"
          fontSize="sm"
          px="12"
          py="4"
          rounded="full"
        >
          Hover over me
        </HoverCardTrigger>
        <HoverCardContent aria-label="Card label">
          <Text>This is the hover card content</Text>
        </HoverCardContent>
      </HoverCard>
      <Text fontSize="md">State: {open ? "open" : "closed"}</Text>
    </Group>
  );
}
