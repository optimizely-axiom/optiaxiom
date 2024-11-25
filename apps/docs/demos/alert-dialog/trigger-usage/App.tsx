import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
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
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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
