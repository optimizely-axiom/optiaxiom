import type { Meta, StoryObj } from "@storybook/react";

import { Heading, Link, Text } from "@optiaxiom/react";

export default {
  component: Link,
  render: (args) => (
    <Text>
      This is{" "}
      <Link {...args} href="data:,">
        a text link
      </Link>{" "}
      and this is{" "}
      <Link {...args} href="">
        a visited link
      </Link>
      .
    </Text>
  ),
} as Meta<typeof Link>;

type Story = StoryObj<typeof Link>;

export const Basic: Story = {};

export const Subtle: Story = {
  args: {
    appearance: "subtle",
  },
};

export const External: Story = {
  args: {
    external: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Header: Story = {
  args: {
    external: true,
  },
  render: (args) => (
    <Heading level="3">
      This is{" "}
      <Link {...args} href="data:,">
        a text link
      </Link>{" "}
      and this is{" "}
      <Link {...args} href="">
        a visited link
      </Link>
      .
    </Heading>
  ),
};
