import {
  Button,
  Flex,
  Text,
  Toast,
  ToastAction,
  ToastProvider,
  ToastTitle,
  createToaster,
} from "@optiaxiom/react";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

const toaster = createToaster();

export function App() {
  const [status, setStatus] = useState("in-progress");

  return (
    <Flex flexDirection="row">
      <Text w="144">Task is {status}</Text>

      <Button
        appearance="danger-outline"
        disabled={status === "deleted"}
        icon={<IconTrash />}
        onClick={() => {
          setStatus("deleted");
          toaster.create(
            <Toast>
              <ToastTitle>Task Deleted</ToastTitle>
              <ToastAction
                altText="Undo"
                onClick={() => setStatus("in-progress")}
              >
                Undo
              </ToastAction>
            </Toast>,
          );
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

      <ToastProvider toaster={toaster} />
    </Flex>
  );
}
