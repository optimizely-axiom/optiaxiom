import type { Meta, StoryObj } from "@storybook/react";

import { Alert, Flex, Link, Text } from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";

export default {
  component: Alert,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=1593:19796",
    },
  },
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

export const Basic: Story = {
  args: {
    children: "You can update your email only once",
  },
};

export const WithCloseButton: Story = {
  args: {
    children: (
      <>
        Changing your email address is an important account management task that
        requires careful consideration.
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
    children: <>This is an inline section message</>,
  },
  render: (args) => (
    <Flex>
      <Alert intent="neutral" {...args} />
      <Alert intent="information" {...args} />
      <Alert intent="warning" {...args} />
      <Alert intent="danger" {...args} />
      <Alert intent="success" {...args} />
    </Flex>
  ),
};

export const Links: Story = {
  args: {
    children: (
      <>
        <Text>Please give a correct email address</Text>
        <Text>
          <Link href="data:,">Do an action</Link>
        </Text>
      </>
    ),
  },
};
