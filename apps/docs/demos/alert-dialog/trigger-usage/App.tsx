import { IconDelete } from "@optiaxiom/icons";
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
      <AlertDialogTrigger
        appearance="danger-outline"
        aria-label="Delete task"
        icon={<IconDelete />}
      />

      <AlertDialogContent>
        <AlertDialogHeader>Are you sure?</AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete this task?
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel />
          <AlertDialogAction>Yes, Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
