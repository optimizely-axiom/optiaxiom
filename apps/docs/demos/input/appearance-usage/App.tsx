"use client";

import { Flex, Input } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row">
      <Input defaultValue="Text value" />
      <Input appearance="number" defaultValue="23.50" />
    </Flex>
  );
}
