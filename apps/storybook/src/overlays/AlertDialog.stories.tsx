import type { Meta, StoryObj } from "@storybook/react";

import { AlertDialog, Button, Flex } from "@optiaxiom/react";
import { expect, screen, userEvent, within } from "@storybook/test";
import { useState } from "react";

const meta: Meta<typeof AlertDialog> = {
  component: AlertDialog,
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

const LongText =
  "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.";

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
          handleClose();
        }}
        onCancel={() => {
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
    children: "Are you sure you want to delete this image?",
    title: "Delete Image",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Confirm" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(
      screen.queryByRole("alertdialog", { name: "Delete Image" }),
    ).not.toBeInTheDocument();
  },
  render: Template,
};

export const CustomButtons: Story = {
  args: {
    ...Default.args,
    action: "Yes, Delete",
    cancel: "No, Keep",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    await expect(
      await screen.findByRole("alertdialog", { name: "Delete Image" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Yes, Delete" }),
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "No, Keep" }),
    ).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "No, Keep" }));
    await expect(
      screen.queryByRole("alertdialog", { name: "Delete Image" }),
    ).not.toBeInTheDocument();
  },
  render: Template,
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    children: LongText,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button"));
    const dialog = await screen.findByRole("alertdialog", {
      name: "Delete Image",
    });
    await expect(dialog).toBeInTheDocument();
    const contentId = dialog.getAttribute("aria-describedby");
    expect(contentId).not.toBeNull;
    if (contentId) {
      const contentElement = document.getElementById(contentId);
      const hasScrollbar = (element: typeof contentElement) => {
        if (!element) {
          return false;
        }
        const hasVerticalScrollbar =
          element.scrollHeight > element.clientHeight;
        const style = window.getComputedStyle(element);
        const hasOverflowY =
          style.overflowY === "scroll" || style.overflowY === "auto";
        return hasVerticalScrollbar && hasOverflowY;
      };
      const scrollbarExists = hasScrollbar(contentElement);
      await expect(scrollbarExists).toBe(true);
    }
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(
      screen.queryByRole("alertdialog", { name: "Delete Image" }),
    ).not.toBeInTheDocument();
  },
  render: Template,
};

export const MediumDialog: Story = {
  args: {
    ...Default.args,
    children: LongText,
    size: "md",
  },
  render: Template,
};

export const LargeDialog: Story = {
  args: {
    ...Default.args,
    children: LongText,
    size: "lg",
  },
  render: Template,
};
