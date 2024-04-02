import type { Meta, StoryObj } from "@storybook/react";

import { Paper, Text } from "@optiaxiom/react";

const meta: Meta<typeof Paper> = {
  component: Paper,
};

export default meta;

type Story = StoryObj<typeof Paper>;

export const Primary: Story = {
  args: {
    children: <Text>Hello World!</Text>,
    padding: "md",
    shadow: "xs",
  },
};
