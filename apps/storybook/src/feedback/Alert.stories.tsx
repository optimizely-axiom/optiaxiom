import type { Meta, StoryObj } from "@storybook/react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Field,
  Flex,
  Input,
  Link,
} from "@optiaxiom/react";
import { type ComponentPropsWithoutRef, useState } from "react";

export default {
  component: Alert,
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

type AlertProps = {
  colorScheme: ComponentPropsWithoutRef<typeof Alert>["colorScheme"];
  description: string;
  title: string;
};

const AlertTemplate = (args: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(args);
  const [email, setEmail] = useState("");
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const addAlert = (
    type: AlertProps["colorScheme"],
    title: string,
    description: string,
  ) => {
    setCurrentAlert({ colorScheme: type, description, title });
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
    <Flex flexDirection="column" w="384">
      {showAlert && (
        <Alert
          colorScheme={currentAlert.colorScheme}
          onClose={() => setShowAlert(false)}
        >
          <AlertTitle>{currentAlert.title}</AlertTitle>
          <AlertDescription>{currentAlert.description}</AlertDescription>
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

const DefaultTemplate = (args: ComponentPropsWithoutRef<typeof Alert>) => {
  const [showDefaultAlert, setShowDefaultAlert] = useState(true);
  const [showSolidAlert, setShowSolidAlert] = useState(true);

  return (
    <Flex flexDirection="column">
      {showDefaultAlert && (
        <Alert onClose={() => setShowDefaultAlert(false)} {...args}>
          {args.children}
        </Alert>
      )}
      {showSolidAlert && (
        <Alert
          onClose={() => setShowSolidAlert(false)}
          variant="solid"
          {...args}
        >
          {args.children}
        </Alert>
      )}
    </Flex>
  );
};

export const Basic: Story = {
  args: {
    children: (
      <AlertDescription>You can update your email only once</AlertDescription>
    ),
  },
  render: DefaultTemplate,
};

export const Large: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          Changing your email address is an important account management task
          that requires careful consideration. Your email serves as a primary
          means of communication and often as a recovery method for your
          account. Here are some key points to keep in mind
        </AlertDescription>
      </>
    ),
  },
  render: DefaultTemplate,
};

export const Danger: Story = {
  args: {
    children: (
      <AlertDescription>You can only change email only once</AlertDescription>
    ),
    colorScheme: "danger",
  },
  render: DefaultTemplate,
};

export const Success: Story = {
  args: {
    children: (
      <AlertDescription>Email has been updated successfully</AlertDescription>
    ),
    colorScheme: "success",
    title: "Success",
  },
  render: DefaultTemplate,
};

export const Warning: Story = {
  args: {
    children: (
      <AlertDescription>Please give a correct email address</AlertDescription>
    ),
    colorScheme: "warning",
  },
  render: DefaultTemplate,
};

export const DefaultWithLink: Story = {
  args: {
    children: (
      <>
        <AlertTitle>With link</AlertTitle>
        <AlertDescription>Please give a correct email address</AlertDescription>
        <Link href="">Do an action</Link>
      </>
    ),
  },
  render: DefaultTemplate,
};

export const UserInteractive: Story = {
  render: () =>
    AlertTemplate({
      colorScheme: "information",
      description: "You can update your email only once",
      title: "Info",
    }),
};
