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
  appearance,
}: Pick<ComponentPropsWithRef<typeof AlertDialogContent>, "appearance">) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete comment</AlertDialogTrigger>

      <AlertDialogContent appearance={appearance}>
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
