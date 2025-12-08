"use client";

import { Banner, Button, Group, Link, toaster } from "@optiaxiom/react";

export function App() {
  return (
    <Banner onDismiss={() => {}} w="full">
      <Group
        flexDirection={["column", "row"]}
        gap="16"
        justifyContent="space-between"
      >
        You do not have the required permissions to perform this action.
        <Group gap="16">
          <Link external href="data:,">
            Learn more
          </Link>
          <Button onClick={() => toaster.create("Triggered action")} size="sm">
            Action
          </Button>
        </Group>
      </Group>
    </Banner>
  );
}
