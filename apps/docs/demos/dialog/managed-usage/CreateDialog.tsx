import {
  Button,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogForm,
  DialogHeader,
  dialogkit,
  Field,
  Input,
  toaster,
  useDialogKit,
} from "@optiaxiom/react";

export function CreateDialog() {
  const { id } = useDialogKit();

  return (
    <DialogContent>
      <DialogHeader>Modal Title</DialogHeader>
      <DialogForm
        onSubmit={(event) => {
          event.preventDefault();
          if (event.target instanceof HTMLFormElement) {
            toaster.create(
              `Submitted: ${JSON.stringify(
                Object.fromEntries(new FormData(event.target)),
              )}`,
            );
          }
          dialogkit.remove(id);
        }}
      >
        <DialogBody>
          <Field label="Name">
            <Input autoFocus name="name" />
          </Field>
          <Field label="Description">
            <Input name="description" />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button appearance="primary" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogForm>
    </DialogContent>
  );
}
