import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  Flex,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("");

  return (
    <Flex flexDirection="row">
      <AlertDialog
        onOpenChange={(open) => {
          if (open) {
            setState("");
          }
          setOpen(open);
        }}
        open={open}
      >
        <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Delete comment and replies?</AlertDialogTitle>

          <AlertDialogBody>
            The comment and all replies will be deleted.
          </AlertDialogBody>

          <AlertDialogFooter>
            <AlertDialogCancel />

            <AlertDialogAction onClick={() => setState("confirm")}>
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {state && (
        <Text>
          Clicked <strong>{state}</strong>
        </Text>
      )}
    </Flex>
  );
}
