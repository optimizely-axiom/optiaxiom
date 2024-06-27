import type { Meta, StoryObj } from "@storybook/react";

import { AlertDialog, Button, Flex } from "@optiaxiom/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof AlertDialog> = {
  argTypes: {
    action: { control: "text" },
    cancel: { control: "text" },
    onAction: { action: "onAction" },
    onCancel: { action: "onCancel" },
    title: { control: "text" },
  },
  component: AlertDialog,
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

const Template = (args: React.ComponentProps<typeof AlertDialog>) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Flex>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <AlertDialog
        {...args}
        onAction={() => {
          args.onAction();
          handleClose();
        }}
        onCancel={() => {
          args.onCancel();
          handleClose();
        }}
        open={open}
      >
        {args.children}
      </AlertDialog>
    </Flex>
  );
};

export const Default: Story = {
  args: {
    action: "Confirm",
    cancel: "Cancel",
    children: "Are you sure you want to delete this image?",
    title: "Delete Image",
  },
  render: (args) => <Template {...args} />,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    const alertdialog = await screen.findByRole("alertdialog", {
      name: "Delete Image",
    });
    await expect(alertdialog).toBeInTheDocument();
    await userEvent.click(
      await screen.findByRole("button", { name: "Cancel" }),
    );
    await expect(alertdialog).not.toBeInTheDocument();
  },
};

export const CustomButtons: Story = {
  ...Default,
  args: {
    ...Default.args,
    action: "Yes, Delete",
    cancel: "Cancel",
  },
};

export const LongContent: Story = {
  ...Default,
  args: {
    ...Default.args,
    action: "Confirm",
    cancel: "Cancel",
    children:
      "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.",
  },
};
