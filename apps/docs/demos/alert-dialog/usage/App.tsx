import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
  Flex,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState("");

  return (
    <>
      <Flex flexDirection="row">
        <Button onClick={() => setOpen(true)}>Publish Article</Button>

        <Text>
          {state && (
            <>
              Clicked <strong>{state}</strong>
            </>
          )}
        </Text>
      </Flex>

      <AlertDialog open={open}>
        <AlertDialogTitle>Publish Article</AlertDialogTitle>

        <AlertDialogDescription>
          Are you sure you want to publish this article?
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setState("cancel");
              setOpen(false);
            }}
          />

          <AlertDialogAction
            onClick={() => {
              setState("confirm");
              setOpen(false);
            }}
          >
            Yes, Publish
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialog>
    </>
  );
}
