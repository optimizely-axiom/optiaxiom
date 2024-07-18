import type { Meta, StoryObj } from "@storybook/react";

import { Link, Text } from "@optiaxiom/react";

export default {
  component: Link,
} as Meta<typeof Link>;

type Story = StoryObj<typeof Link>;

export const Primary: Story = {
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
};

export const Subtle: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: "subtle",
  },
};

export const Muted: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    variant: "muted",
  },
};

export const External: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    external: true,
  },
};

export const Disabled: Story = {
  ...Primary,
  args: {
    ...Primary.args,
    disabled: true,
  },
};
