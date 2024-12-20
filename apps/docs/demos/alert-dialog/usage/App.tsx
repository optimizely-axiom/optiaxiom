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
import { useEffect, useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("");

  useEffect(() => {
    if (open) {
      setState("");
    }
  }, [open]);

  return (
    <Flex flexDirection="row">
      <AlertDialog onOpenChange={setOpen} open={open}>
        <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

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
