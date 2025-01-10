import type { Meta, StoryObj } from "@storybook/react";

import { Flex, Link, Text } from "@optiaxiom/react";
import { Banner } from "@optiaxiom/react";
import { action } from "@storybook/addon-actions";

export default {
  component: Banner,
  parameters: {
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
    onClose: () => {},
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
