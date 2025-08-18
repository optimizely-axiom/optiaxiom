"use client";

import {
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  toaster,
} from "@optiaxiom/react";
import { dialogkit } from "@optiaxiom/react/unstable";

export function App() {
  return (
    <Button
      onClick={() =>
        dialogkit.create(
          <AlertDialogContent>
            <AlertDialogHeader>Delete comment?</AlertDialogHeader>

            <AlertDialogBody>
              The comment and all replies will be deleted.
            </AlertDialogBody>

            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction
                onClick={() => toaster.create("Clicked confirm!")}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>,
        )
      }
    >
      Delete comment
    </Button>
  );
}
