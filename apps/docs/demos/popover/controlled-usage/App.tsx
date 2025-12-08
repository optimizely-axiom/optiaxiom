"use client";

import {
  Group,
  Heading,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Switch,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [keepOpen, setKeepOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Group gap="16">
      <Switch onCheckedChange={setKeepOpen}>Keep popover open</Switch>
      <Popover onOpenChange={(flag) => setOpen(flag || keepOpen)} open={open}>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>
          <Heading fontSize="md">Popover content</Heading>
          <Text>This is the popover content</Text>
        </PopoverContent>
      </Popover>
    </Group>
  );
}
