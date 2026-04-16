"use client";

import { IconDelete } from "@optiaxiom/icons";
import { Button, Group, Text, toaster } from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [status, setStatus] = useState("in-progress");

  return (
    <Group gap="16">
      <Text>Task {status}</Text>
      <Button
        appearance="danger-outline"
        disabled={status === "deleted"}
        icon={<IconDelete />}
        onClick={() => {
          setStatus("deleted");
          toaster.create("Task Deleted", {
            action: "Undo",
            onAction: () => setStatus("in-progress"),
          });
        }}
      >
        Delete
      </Button>
      <Button
        disabled={status !== "deleted"}
        onClick={() => setStatus("in-progress")}
      >
        Restore
      </Button>
    </Group>
  );
}
