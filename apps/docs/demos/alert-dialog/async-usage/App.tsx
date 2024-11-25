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
import { useState } from "react";

export function App() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog
      onOpenChange={
        /**
         * 3. Make sure to disable closing the modal.
         */
        loading ? undefined : setOpen
      }
      open={open}
    >
      <AlertDialogTrigger>Delete task</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogBody>
          The task and all contents will be deleted. This action cannot be
          undone.
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} />
          <AlertDialogAction
            loading={loading}
            onClick={(event) => {
              /**
               * 1. Prevent the modal from being dismissed.
               */
              event.preventDefault();

              /**
               * 2. Set your loading state and perform your async operation.
               */
              setLoading(true);
              setTimeout(() => {
                setLoading(false);

                /**
                 * 4. Close the modal manually once the operation is complete.
                 */
                setOpen(false);
              }, 3000);
            }}
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
