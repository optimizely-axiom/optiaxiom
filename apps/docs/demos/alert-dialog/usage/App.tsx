import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@optiaxiom/react";

export function App() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>Delete comment?</AlertDialogHeader>

        <AlertDialogBody>
          The comment and all replies will be deleted.
        </AlertDialogBody>

        <AlertDialogFooter>
          <AlertDialogCancel />
          <AlertDialogAction>Yes, delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
