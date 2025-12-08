"use client";

import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
  Group,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(true);

  return (
    <Group flexDirection="column" gap="16" maxW="sm" w="full">
      <Disclosure onOpenChange={setOpen} open={open}>
        <DisclosureTrigger>Disclosure label</DisclosureTrigger>
        <DisclosureContent>
          Aenean neque dui, lobortis et sem quis, mattis varius nisl. Nulla
          turpis sapien, venenatis eu pharetra at, ullamcorper sed nibh.
        </DisclosureContent>
      </Disclosure>
      <Text fontSize="md">State: {open ? "open" : "closed"}</Text>
    </Group>
  );
}
