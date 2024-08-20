import type { Meta, StoryObj } from "@storybook/react";

import { Field, Input } from "@optiaxiom/react";
import { IconCalendar } from "@tabler/icons-react";

export default {
  args: {
    children: <Input placeholder="Enter text..." />,
    label: "Label",
  },
  component: Field,
} as Meta<typeof Field>;

type Story = StoryObj<typeof Field>;

export const Basic: Story = {};

export const Required: Story = {
  args: {
    children: (
      <Input
        placeholder="Enter date..."
        startDecorator={<IconCalendar size="20" />}
      />
    ),
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: <Input disabled placeholder="Enter text..." />,
  },
};

export const Description: Story = {
  args: {
    description: "This is a help text",
  },
};

export const Error: Story = {
  args: {
    error: "Required field",
  },
};

export const DescriptionAndError: Story = {
  args: {
    ...Description.args,
    ...Error.args,
  },
};

export const Info: Story = {
  args: {
    info: "This is an important input",
  },
};

export const RequiredAndInfo: Story = {
  args: {
    ...Info.args,
    ...Required.args,
  },
};
