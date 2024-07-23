import type { Meta, StoryObj } from "@storybook/react";

import { Link, Text } from "@optiaxiom/react";

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
    variant: "subtle",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
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
