"use client";

import { Button, Flex, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Flex flexDirection="row" flexWrap="wrap">
      {(
        ["danger", "information", "neutral", "success", "warning"] as const
      ).map((intent) => (
        <Button
          key={intent}
          onClick={() =>
            toaster.create("This is an example toast message.", { intent })
          }
        >
          {intent} toast
        </Button>
      ))}
    </Flex>
  );
}
