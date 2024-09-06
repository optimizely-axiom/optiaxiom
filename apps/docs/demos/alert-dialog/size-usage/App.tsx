import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@optiaxiom/react";
import { type ComponentPropsWithRef } from "react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof AlertDialogContent>, "size">) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

      <AlertDialogContent size={size}>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>
          The comment and all replies will be deleted.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel />
          <AlertDialogAction>Yes, delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
