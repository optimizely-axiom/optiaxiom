import type { Meta, StoryObj } from "@storybook/react";

import { Button, Flex, Toast } from "@optiaxiom/react";
import { useState } from "react";

type ToastProps = {
  children: React.ReactNode;
  position?:
    | "bottom"
    | "bottom-left"
    | "bottom-right"
    | "top"
    | "top-left"
    | "top-right";
  type?: "danger" | "info" | "success" | "warning";
};
const meta: Meta<typeof Toast> = {
  argTypes: {
    position: {
      control: "select",
      options: [
        "bottom",
        "bottom-left",
        "bottom-right",
        "top",
        "top-left",
        "top-right",
      ],
    },
    type: {
      control: "select",
      options: ["danger", "info", "success", "warning"],
    },
  },
  component: Toast,
};

export default meta;
type Story = StoryObj<ToastProps>;
const ToastTemplate = (args: ToastProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <Flex flexDirection="column" gap="4">
      <Button onClick={handleOpen} preset="primary">
        Show Toast
      </Button>

      <Toast close="close" onClose={handleClose} open={open}>
        {args.children}
      </Toast>
    </Flex>
  );
};

export const Default: Story = {
  args: {
    children: "This is a default toast message",
    position: "bottom-right",
    type: "info",
  },
  render: ToastTemplate,
};

export const SuccessToast: Story = {
  args: {
    children: "Operation completed successfully!",
    position: "top-left",
    type: "success",
  },
  render: ToastTemplate,
};

export const WarningToast: Story = {
  args: {
    children: "Please be cautious of this action.",
    position: "bottom-left",
    type: "warning",
  },
  render: ToastTemplate,
};

export const DangerToast: Story = {
  args: {
    children: "An error occurred. Please try again.",
    position: "top",
    type: "danger",
  },
  render: ToastTemplate,
};

export const CustomPositionedToast: Story = {
  args: {
    children: "This toast appears in the top-left corner.",
    position: "top-left",
    type: "info",
  },
  render: ToastTemplate,
};

export const LongContentToast: Story = {
  args: {
    children:
      "This is a toast with a longer message. It demonstrates how the toast component handles more content and potentially wraps text to multiple lines.",
    position: "bottom",
    type: "info",
  },
  render: ToastTemplate,
};
