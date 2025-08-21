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
      onClick={async () => {
        const result = await dialogkit.confirm(
          <AlertDialogContent>
            <AlertDialogHeader>Delete comment?</AlertDialogHeader>
            <AlertDialogBody>
              The comment and all replies will be deleted.
            </AlertDialogBody>
            <AlertDialogFooter>
              <AlertDialogCancel />
              <AlertDialogAction>Yes, delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>,
        );
        if (result) {
          toaster.create("Clicked confirm!");
        }
      }}
    >
      Delete comment
    </Button>
  );
}
