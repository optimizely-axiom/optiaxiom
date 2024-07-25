import type { Meta, StoryObj } from "@storybook/react";

import { Alert, Button, Field, Flex, Input } from "@optiaxiom/react";
import { type ReactNode, useState } from "react";

export default {
  component: Alert,
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

type AlertProps = {
  children: ReactNode;
  onClose?: () => void;
  size?: "lg" | "md";
  title?: ReactNode;
  type?: "danger" | "info" | "success" | "warning";
};

const AlertTemplate = (args: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(args);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addAlert = (
    type: AlertProps["type"],
    title: string,
    children: ReactNode,
  ) => {
    setCurrentAlert({ children, title, type });
    setShowAlert(true);
  };

  const handleEmailUpdate = () => {
    if (!email.includes("@")) {
      addAlert(
        "danger",
        "Invalid Email",
        "Please enter a valid email address.",
      );
    } else {
      setTimeout(() => {
        addAlert(
          "success",
          "Email Updated",
          "Your email has been successfully updated.",
        );
      }, 500);
    }
  };

  return (
    <Flex flexDirection="column">
      {showAlert && (
        <Alert
          onClose={() => setShowAlert(false)}
          size={args.size}
          title={currentAlert.title}
          type={currentAlert.type}
        >
          {currentAlert.children}
        </Alert>
      )}
      <Field info="Your current email address" label="Email Address" required>
        <Input
          onChange={handleEmailChange}
          size="lg"
          type="email"
          value={email}
        />
      </Field>
      <Button
        appearance="primary"
        disabled={email === ""}
        onClick={handleEmailUpdate}
      >
        Submit
      </Button>
    </Flex>
  );
};

const DefaultTemplate = (args: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Flex flexDirection="column">
      {showAlert && (
        <Alert onClose={() => setShowAlert(false)} {...args}></Alert>
      )}
    </Flex>
  );
};

export const Default: Story = {
  args: {
    children: "You can update your email only once",
  },
  render: DefaultTemplate,
};

export const Large: Story = {
  args: {
    children:
      "Changing your email address is an important account management task that requires careful consideration. Your email serves as a primary means of communication and often as a recovery method for your account. Here are some key points to keep in mind",
    size: "lg",
    title: "Disclaimer",
  },
  render: DefaultTemplate,
};

export const Danger: Story = {
  args: {
    children: "You can only change email only once",
    type: "danger",
  },
  render: DefaultTemplate,
};

export const Success: Story = {
  args: {
    children: "Email has been updated successfully",
    title: "Success",
    type: "success",
  },
  render: DefaultTemplate,
};

export const Warning: Story = {
  args: {
    children: "Please give a correct email address",
    type: "warning",
  },
  render: DefaultTemplate,
};

export const UserInteractive: Story = {
  args: {
    children: "You can update your email only once",
  },
  render: AlertTemplate,
};
