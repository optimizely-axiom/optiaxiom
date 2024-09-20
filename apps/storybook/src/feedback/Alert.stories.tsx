import type { Meta, StoryObj } from "@storybook/react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Flex,
  Link,
  Text,
} from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";

export default {
  component: Alert,
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    children: (
      <AlertDescription>You can update your email only once</AlertDescription>
    ),
  },
};

export const WithCloseButton: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          Changing your email address is an important account management task
          that requires careful consideration.
        </AlertDescription>
      </>
    ),
    onClose: action("close"),
  },
  render: (args) => (
    <Flex>
      <Alert {...args} />
    </Flex>
  ),
};

export const Appearance: Story = {
  args: {
    children: (
      <AlertDescription>This is an inline section message</AlertDescription>
    ),
  },
  render: (args) => (
    <Flex>
      <Alert colorScheme="neutral" {...args} />
      <Alert colorScheme="information" {...args} />
      <Alert colorScheme="warning" {...args} />
      <Alert colorScheme="danger" {...args} />
      <Alert colorScheme="success" {...args} />
    </Flex>
  ),
};

export const Links: Story = {
  args: {
    children: (
      <>
        <AlertTitle>With link</AlertTitle>
        <AlertDescription>
          <Text>Please give a correct email address</Text>
          <Text>
            <Link href="data:,">Do an action</Link>
          </Text>
        </AlertDescription>
      </>
    ),
  },
};
