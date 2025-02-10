"use client";

import { Banner, Button, Flex, Link, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Banner onDismiss={() => {}} w="full">
      <Flex flexDirection={["column", "row"]} justifyContent="space-between">
        You do not have the required permissions to perform this action.
        <Flex flexDirection="row">
          <Link external href="data:,">
            Learn more
          </Link>
          <Button onClick={() => toaster.create("Triggered action")} size="sm">
            Action
          </Button>
        </Flex>
      </Flex>
    </Banner>
  );
}
