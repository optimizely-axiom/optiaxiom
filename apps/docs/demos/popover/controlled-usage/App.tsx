"use client";

import {
  Flex,
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
    <Flex flexDirection="row">
      <Switch onCheckedChange={setKeepOpen}>Keep popover open</Switch>

      <Popover onOpenChange={(flag) => setOpen(flag || keepOpen)} open={open}>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>
          <Heading level="6">Popover content</Heading>
          <Text>This is the popover content</Text>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
