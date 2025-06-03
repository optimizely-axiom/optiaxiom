import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flex, Link, Text } from "@optiaxiom/react";
import { Banner } from "@optiaxiom/react";
import { action } from "storybook/actions";

export default {
  component: Banner,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/qs72V79n1s9wYOcZ1TzBwM/Components-V2?node-id=2013:26186",
    },
    layout: "padded",
  },
} as Meta<typeof Banner>;

type Story = StoryObj<typeof Banner>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <Text flex="1">
          One or more of your social channel access tokens have expired.
        </Text>

        <Text>
          <Link appearance="subtle" href="data:,">
            Sync now
          </Link>
        </Text>
      </>
    ),
    onDismiss: () => {},
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
    onDismiss: action("onDismiss"),
  },
  render: (args) => (
    <Flex>
      <Banner {...args} />
    </Flex>
  ),
};

export const Appearance: Story = {
  args: {
    children: <>This is a site wide banner message</>,
  },
  render: (args) => (
    <Flex>
      <Banner intent="neutral" {...args} />
      <Banner intent="information" {...args} />
      <Banner intent="warning" {...args} />
      <Banner intent="danger" {...args} />
      <Banner intent="success" {...args} />
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
