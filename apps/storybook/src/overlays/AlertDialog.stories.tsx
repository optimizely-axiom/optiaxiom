import type { Meta, StoryObj } from "@storybook/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  Button,
} from "@optiaxiom/react";
import { expect, screen, userEvent, waitFor } from "@storybook/test";
import { type ComponentPropsWithoutRef, useState } from "react";

const withTemplate = ({
  action = "Confirm",
  cancel = "Cancel",
  defaultOpen = true,
  description = "Are you sure you want to delete this image?",
} = {}) =>
  function Template(args: ComponentPropsWithoutRef<typeof AlertDialog>) {
    const [open, setOpen] = useState(defaultOpen);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <>
        <Button onClick={handleOpen}>Open Dialog</Button>

        <AlertDialog {...args} open={open}>
          <AlertDialogTitle>Delete Image</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>
              {cancel}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleClose}>
              {action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </>
    );
  };

export default {
  component: AlertDialog,
  render: withTemplate(),
} as Meta<typeof AlertDialog>;

type Story = StoryObj<typeof AlertDialog>;

const largeText =
  "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.";

export const Basic: Story = {
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(
        screen.queryByRole("alertdialog", { name: "Delete Image" }),
      ).not.toBeInTheDocument(),
    );
  },
  render: withTemplate({ defaultOpen: false }),
};

export const CustomButtons: Story = {
  play: async () => {
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Yes, Delete" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "No, Keep" }),
    ).toBeInTheDocument();
  },
  render: withTemplate({ action: "Yes, Delete", cancel: "No, Keep" }),
};

export const Medium: Story = {
  args: {
    size: "md",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const LongContent: Story = {
  args: {
    children: largeText,
  },
  render: withTemplate({ description: largeText }),
};

export const LongContentMedium: Story = {
  ...LongContent,
  args: {
    size: "md",
  },
};

export const LongContentLarge: Story = {
  ...LongContent,
  args: {
    size: "lg",
  },
};
