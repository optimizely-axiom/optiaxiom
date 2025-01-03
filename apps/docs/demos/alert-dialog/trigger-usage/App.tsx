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
import { IconTrash } from "@tabler/icons-react";

export function App() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        appearance="danger-outline"
        aria-label="Delete task"
        icon={<IconTrash />}
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
