import type { Meta, StoryObj } from "@storybook/react";

import { Alert, Button, Flex } from "@optiaxiom/react";
import { type ReactNode, useState } from "react";

export default {
  component: Alert,
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

type AlertProps = {
  children: ReactNode;
  onClose?: () => void;
  title?: ReactNode;
  type?: "danger" | "info" | "success" | "warning";
};

const AlertTemplate = (args: AlertProps) => {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Flex flexDirection="column">
      <Button onClick={() => setShowAlert(true)}>Show Alert</Button>
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} {...args}>
          {args.children}
        </Alert>
      )}
    </Flex>
  );
};

export const Default: Story = {
  args: {
    children: "This is a default alert message",
  },
  render: AlertTemplate,
};

export const Large: Story = {
  args: {
    children:
      "This is a longer piece of content that demonstrates how the AlertDialog handles more text. It might wrap to multiple lines depending on the width of the dialog.",
    size: "lg",
    title: "Default title",
  },
  render: AlertTemplate,
};

export const Danger: Story = {
  args: {
    children: "This is a danger alert message",
    type: "danger",
  },
  render: AlertTemplate,
};

export const Success: Story = {
  args: {
    children: "This is a success alert message",
    title: "Success title",
    type: "success",
  },
  render: AlertTemplate,
};
export const Warning: Story = {
  args: {
    children: "This is a warning alert message",
    type: "warning",
  },
  render: AlertTemplate,
};
