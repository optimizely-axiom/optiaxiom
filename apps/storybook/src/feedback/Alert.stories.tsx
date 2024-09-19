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
      <Alert variant="light" {...args} />
      <Alert variant="solid" {...args} />
    </Flex>
  ),
};

export const Solid: Story = {
  args: {
    children: (
      <AlertDescription>This is a site wide banner message</AlertDescription>
    ),
    variant: "solid",
  },
  render: (args) => (
    <Flex>
      <Alert colorScheme="neutral" {...args} />
      <Alert colorScheme="informational" {...args} />
      <Alert colorScheme="warning" {...args} />
      <Alert colorScheme="danger" {...args} />
      <Alert colorScheme="success" {...args} />
    </Flex>
  ),
};

export const Light: Story = {
  args: {
    children: (
      <AlertDescription>This is an inline section message</AlertDescription>
    ),
    variant: "light",
  },
  render: (args) => (
    <Flex>
      <Alert colorScheme="neutral" {...args} />
      <Alert colorScheme="informational" {...args} />
      <Alert colorScheme="warning" {...args} />
      <Alert colorScheme="danger" {...args} />
      <Alert colorScheme="success" {...args} />
    </Flex>
  ),
};

export const Banner: Story = {
  args: {
    children: (
      <>
        <AlertDescription flexDirection="row">
          <Text flex="1">
            One or more of your social channel access tokens have expired.
          </Text>

          <Text>
            <Link colorScheme="neutral" href="data:,">
              Sync now
            </Link>
          </Text>
        </AlertDescription>
      </>
    ),
    colorScheme: "danger",
    onClose: () => {},
    variant: "solid",
  },
  parameters: {
    layout: "padded",
  },
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
