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
import { type ComponentPropsWithRef } from "react";

export function App({
  size,
}: Pick<ComponentPropsWithRef<typeof AlertDialogContent>, "size">) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

      <AlertDialogContent size={size}>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
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
