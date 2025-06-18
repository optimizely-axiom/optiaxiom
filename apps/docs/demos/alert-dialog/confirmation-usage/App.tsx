"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  Flex,
  Text,
} from "@optiaxiom/react";
import { useState } from "react";

export function App() {
  const [state, setState] = useState("");

  return (
    <Flex>
      <AlertDialog>
        <AlertDialogTrigger
          onClick={() => requestAnimationFrame(() => setState(""))}
        >
          Delete comment
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>Delete comment?</AlertDialogHeader>

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
