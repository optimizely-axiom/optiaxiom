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
import { type ComponentPropsWithRef } from "react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof AlertDialogContent>, "size">) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

      <AlertDialogContent size={size}>
        <AlertDialogHeader>Are you sure?</AlertDialogHeader>
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
