import { Button, Flex, Text, toaster } from "@optiaxiom/react";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export function App() {
  const [status, setStatus] = useState("in-progress");

  return (
    <Flex flexDirection="row">
      <Text>Task {status}</Text>

      <Button
        appearance="danger-outline"
        disabled={status === "deleted"}
        icon={<IconTrash />}
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
    </Flex>
  );
}
